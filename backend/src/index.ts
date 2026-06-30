import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

// ─── Config ──────────────────────────────────────────────────────────────────

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const s3 = new S3Client({});
const SALT = 12;
const COOKIE = "sess";
const COOKIE_MAX = 2 * 60 * 60;

const env = {
  USERS: process.env.USERS_TABLE || "",
  COURTS: process.env.COURTS_TABLE || "",
  BOOKINGS: process.env.BOOKINGS_TABLE || "",
  S3_BUCKET: process.env.S3_BUCKET || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "2h",
  CORS: process.env.CORS_ORIGIN || "*",
  NODE_ENV: process.env.NODE_ENV || "production",
  AWS_REGION: process.env.AWS_REGION || "ap-southeast-1",
};

interface Booking {
  bookingId: string;
  userId: string;
  courtId: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  amount: number;
  status: string;
  createdAt: string;
}

const cors = (extra: Record<string, string> = {}) => ({
  "Access-Control-Allow-Origin": env.CORS,
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  ...extra,
});

const ok = (data: unknown, cookies: string[] = []) => ({
  statusCode: 200,
  headers: cors(cookies.length ? { "Set-Cookie": cookies.join(", ") } : {}),
  body: JSON.stringify(data),
});

const err = (code: number, message: string, details?: unknown) => ({
  statusCode: code,
  headers: cors(),
  body: JSON.stringify({ error: message, ...(details !== undefined ? { details } : {}) }),
});

// ─── Auth ────────────────────────────────────────────────────────────────────

async function hash(pw: string) { return bcrypt.hash(pw, SALT); }
async function check(pw: string, h: string) { return bcrypt.compare(pw, h); }
function sign(userId: string, email: string, role: string) {
  return jwt.sign({ userId, email, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY } as any);
}
function verify(token: string) { try { return jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string; role: string }; } catch { return null; } }

function extractToken(e: APIGatewayProxyEventV2): string | null {
  const a = e.headers?.Authorization || e.headers?.authorization;
  if (a?.startsWith("Bearer ")) return a.slice(7);
  for (const c of e.cookies || []) if (c.startsWith(COOKIE + "=")) return c.split("=")[1];
  return null;
}

function makeCookie(value: string, max = COOKIE_MAX) {
  const p = [`${COOKIE}=${value}`, `Max-Age=${max}`, "Path=/", "HttpOnly", "SameSite=Strict"];
  if (env.NODE_ENV !== "test") p.push("Secure");
  return p.join("; ");
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getUserByEmail(email: string) {
  const r = await ddb.send(new QueryCommand({ TableName: env.USERS, IndexName: "EmailIndex", KeyConditionExpression: "entityType = :et AND email = :e", ExpressionAttributeValues: { ":et": "USER", ":e": email.toLowerCase().trim() } }));
  return r.Items?.[0];
}

async function getUser(id: string) {
  const r = await ddb.send(new GetCommand({ TableName: env.USERS, Key: { PK: `USER#${id}`, SK: "METADATA" } }));
  return r.Item;
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function register(body: Record<string, unknown>) {
  const { name, email, password, phone } = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(8), phone: z.string().optional() }).parse(body);
  const role = "user";
  if (!/[a-z]/.test(password)) throw new Error("Password harus ada huruf kecil a-z");
  if (!/[A-Z]/.test(password)) throw new Error("Password harus ada huruf besar A-Z");
  if (!/\d/.test(password)) throw new Error("Password harus ada angka 0-9");
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)) throw new Error("Password harus ada simbol !@#$%...");

  const existing = await getUserByEmail(email);
  if (existing) return err(409, "Email sudah terdaftar");

  const uid = `USER#${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();
  await ddb.send(new PutCommand({
    TableName: env.USERS,
    Item: { PK: uid, SK: "METADATA", entityType: "USER", userId: uid, email: email.toLowerCase(), name, passwordHash: await hash(password), role, phone: phone?.trim() || "", createdAt: now, updatedAt: now },
    ConditionExpression: "attribute_not_exists(PK)",
  }));

  const token = sign(uid, email.toLowerCase(), role);
  return ok({ user: { userId: uid, email: email.toLowerCase(), name, role, createdAt: now }, message: "Akun berhasil dibuat" }, [makeCookie(token)]);
}

async function login(body: Record<string, unknown>) {
  const { email, password } = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(body);
  const user = await getUserByEmail(email);
  if (!user || !(await check(password, user.passwordHash))) return err(401, "Email atau password salah");
  const token = sign(user.userId, user.email, user.role);
  return ok({ user: { userId: user.userId, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt }, token }, [makeCookie(token)]);
}

async function me(event: APIGatewayProxyEventV2) {
  const token = extractToken(event);
  if (!token) return err(401, "Token tidak ditemukan. Silakan login.");
  const p = verify(token);
  if (!p) return err(401, "Token expired. Silakan login kembali.");
  const user = await getUser(p.userId);
  if (!user) return err(404, "User tidak ditemukan");
  return ok({ user: { userId: user.userId, email: user.email, name: user.name, role: user.role } });
}

async function logout() {
  return ok({ message: "Logout berhasil" }, [makeCookie("", 0)]);
}

// ─── Courts ──────────────────────────────────────────────────────────────────

async function listCourts() {
  const r = await ddb.send(new ScanCommand({ TableName: env.COURTS, Limit: 100 }));
  const items = (r.Items || []) as Array<{ courtId: string; name: string; type: string; pricePerHour: number; surface: string; available: boolean }>;
  return ok({ courts: items });
}

async function getCourt(id: string) {
  const r = await ddb.send(new GetCommand({ TableName: env.COURTS, Key: { PK: `COURT#${id}`, SK: "METADATA" } }));
  const item = r.Item as Record<string, unknown> | undefined;
  if (!item) return err(404, "Court tidak ditemukan");
  return ok({ court: { courtId: item.courtId, name: item.name, type: item.type, pricePerHour: item.pricePerHour, surface: item.surface, available: item.available } });
}

// ─── Bookings ────────────────────────────────────────────────────────────────

async function availability(qp: Record<string, string | undefined>) {
  const date = qp.date || "";
  const courtId = qp.courtId || qp.court || "";
  if (!date || !courtId) return err(400, "Parameter date dan courtId wajib diisi");
  const r = await ddb.send(new QueryCommand({ TableName: env.BOOKINGS, IndexName: "CourtDateIndex", KeyConditionExpression: "courtId = :cid AND #d = :d", ExpressionAttributeNames: { "#d": "date" }, ExpressionAttributeValues: { ":cid": courtId, ":d": date } }));
  const bookings = (r.Items || []) as Booking[];
  const slots: string[] = [];
  for (const b of bookings) {
    if (b.status === "cancelled") continue;
    const sh = Number(b.startTime.split(":")[0]);
    const eh = Number(b.endTime.split(":")[0]);
    for (let h = sh; h < eh; h++) { const s = `${String(h).padStart(2, "0")}:00`; if (!slots.includes(s)) slots.push(s); }
  }
  return ok({ bookedSlots: slots, courtId, date });
}

async function createBooking(event: APIGatewayProxyEventV2) {
  const token = extractToken(event);
  if (!token) return err(401, "Silakan login terlebih dahulu");
  const p = verify(token);
  if (!p) return err(401, "Sesi Anda telah berakhir. Silakan login kembali.");

  const body = JSON.parse(event.body || "{}");
  const { courtId, date, time, duration } = z.object({ courtId: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^\d{2}:\d{2}$/), duration: z.coerce.number().int().min(1).max(4) }).parse(body);

  const sh = Number(time.split(":")[0]);
  if (sh < 0 || sh > 23 || sh + duration > 24) return err(400, "Jam operasional: 00:00 - 24:00. Sesuaikan durasi Anda.");

  const existing = await ddb.send(new QueryCommand({ TableName: env.BOOKINGS, IndexName: "CourtDateIndex", KeyConditionExpression: "courtId = :cid AND #d = :d", ExpressionAttributeNames: { "#d": "date" }, ExpressionAttributeValues: { ":cid": courtId, ":d": date } }));
  const ex = (existing.Items || []) as Booking[];
  const rs = sh * 60, re = rs + duration * 60;
  for (const b of ex) {
    if (b.status === "cancelled") continue;
    const bs = Number(b.startTime.split(":")[0]) * 60 + Number(b.startTime.split(":")[1]);
    const be = Number(b.endTime.split(":")[0]) * 60 + Number(b.endTime.split(":")[1]);
    if (rs < be && re > bs) return err(409, "Slot sudah dipesan. Pilih waktu lain.");
  }

  const now = new Date().toISOString();
  const bid = `BK-${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const eh = sh + duration;
  const prices: Record<string, number> = { A1: 150000, A2: 100000, B1: 150000, B2: 100000 };

  await ddb.send(new PutCommand({
    TableName: env.BOOKINGS, Item: {
      PK: `BOOKING#${bid}`, SK: "METADATA", entityType: "BOOKING", bookingId: bid,
      userId: p.userId, courtId, courtName: `Court ${courtId}`,
      date, startTime: time, endTime: `${String(eh).padStart(2, "0")}:00`,
      durationHours: duration, amount: (prices[courtId] || 150000) * duration,
      status: "confirmed", createdAt: now,
    }, ConditionExpression: "attribute_not_exists(PK)",
  }));

  return ok({ bookingId: bid, courtId, date, time: time, endTime: `${String(eh).padStart(2, "0")}:00`, duration, amount: (prices[courtId] || 150000) * duration, status: "confirmed", message: "Booking berhasil dikonfirmasi" });
}

async function myBookings(event: APIGatewayProxyEventV2) {
  const token = extractToken(event);
  if (!token) return err(401, "Silakan login");
  const p = verify(token);
  if (!p) return err(401, "Sesi expired");

  if (p.role === "admin") {
    const r = await ddb.send(new ScanCommand({ TableName: env.BOOKINGS, Limit: 1000 }));
    const items = (r.Items || []) as Booking[];
    return ok({ bookings: items.map(b => ({ bookingId: b.bookingId, courtId: b.courtId, courtName: b.courtName, date: b.date, startTime: b.startTime, endTime: b.endTime, amount: b.amount, status: b.status })) });
  }

  const r = await ddb.send(new QueryCommand({ TableName: env.BOOKINGS, IndexName: "UserIdIndex", KeyConditionExpression: "userId = :uid", ExpressionAttributeValues: { ":uid": p.userId } }));
  const items = (r.Items || []) as Booking[];
  return ok({ bookings: items.map(b => ({ bookingId: b.bookingId, courtId: b.courtId, courtName: b.courtName, date: b.date, startTime: b.startTime, endTime: b.endTime, amount: b.amount, status: b.status })) });
}

// ─── Admin ───────────────────────────────────────────────────────────────────

async function adminBookings() {
  const r = await ddb.send(new ScanCommand({ TableName: env.BOOKINGS, Limit: 1000 }));
  const items = (r.Items || []) as Booking[];
  return ok({ bookings: items, count: items.length, stats: { confirmed: items.filter(b => b.status === "confirmed").length, pending: items.filter(b => b.status === "pending").length, cancelled: items.filter(b => b.status === "cancelled").length } });
}

async function adminBookingsAdmin(body: Record<string, unknown>) {
  const { bookingId, action } = z.object({ bookingId: z.string(), action: z.enum(["cancel", "delete", "confirm"]) }).parse(body);
  if (action === "cancel") {
    await ddb.send(new UpdateCommand({ TableName: env.BOOKINGS, Key: { PK: `BOOKING#${bookingId}`, SK: "METADATA" }, UpdateExpression: "SET #s = :s, updatedAt = :u", ExpressionAttributeNames: { "#s": "status" }, ExpressionAttributeValues: { ":s": "cancelled", ":u": new Date().toISOString() } }));
    return ok({ bookingId, status: "cancelled" });
  }
  if (action === "delete") {
    await ddb.send(new DeleteCommand({ TableName: env.BOOKINGS, Key: { PK: `BOOKING#${bookingId}`, SK: "METADATA" }, ConditionExpression: "attribute_exists(PK)" }));
    return ok({ bookingId, message: "Dihapus" });
  }
  return err(400, "Action tidak didukung");
}

async function uploadItem(body: Record<string, unknown>) {
  const { file, contentType, folder } = z.object({ file: z.string().min(1), contentType: z.string().optional(), folder: z.string().optional() }).parse(body);
  if (!env.S3_BUCKET) return err(500, "Bucket S3 belum dikonfigurasi");
  const bucket = env.S3_BUCKET;
  const ext = contentType ? contentType.split("/")[1] || "bin" : "bin";
  const key = `${folder || "uploads"}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(file, "base64");
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: buffer, ContentType: contentType || "application/octet-stream" }));
  return ok({ key });
}

async function presignUpload(key: string) {
  if (!env.S3_BUCKET) return err(500, "Bucket S3 belum dikonfigurasi");
  const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: key }), { expiresIn: 3600 });
  return ok({ url, key });
}

// ─── Main Router ─────────────────────────────────────────────────────────────

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const e = env;
  if (!e.USERS || !e.COURTS || !e.BOOKINGS || !e.JWT_SECRET) return err(500, "Server misconfigured");

  const method = (event.requestContext?.http?.method || "GET").toUpperCase();
  const path = event.rawPath || "/";

  if (method === "OPTIONS") return { statusCode: 204, headers: cors(), body: "" };

  if (path.startsWith("/api/auth/register") && method === "POST") {
    try { const body = JSON.parse(event.body || "{}"); return await register(body); } catch (x: any) { return err(400, x.message || "Validasi gagal"); }
  }
  if (path.startsWith("/api/auth/login") && method === "POST") {
    try { const body = JSON.parse(event.body || "{}"); return await login(body); } catch (x: any) { return err(400, x.message || "Validasi gagal"); }
  }
  if (path.startsWith("/api/auth/me") && method === "GET") return await me(event);
  if (path.startsWith("/api/auth/logout") && method === "POST") return await logout();

  if (path.startsWith("/api/courts") && method === "GET") {
    const id = path.replace("/api/courts/", "").replace("/", "");
    return id ? await getCourt(id) : await listCourts();
  }

  if (path.startsWith("/api/orders/availability") && method === "GET") {
    return await availability(event.queryStringParameters || {});
  }
  if (path.startsWith("/api/orders") && method === "POST") return await createBooking(event);
  if (path.startsWith("/api/orders") && method === "GET") return await myBookings(event);
  if (path.startsWith("/api/uploads") && method === "POST") {
    try { const body = JSON.parse(event.body || "{}"); return await uploadItem(body); } catch (x: any) { return err(400, x.message || "Validasi gagal"); }
  }
  const presignPrefix = "/api/uploads/presign/";
  if (path.startsWith(presignPrefix) && method === "GET") {
    const key = path.slice(presignPrefix.length);
    if (!key) return err(400, "Key wajib diisi");
    return await presignUpload(key);
  }

  if (path.startsWith("/api/admin") && method === "GET") {
    const token = extractToken(event);
    if (!token) return err(401, "Token tidak ditemukan. Silakan login.");
    const p = verify(token);
    if (!p) return err(401, "Token expired. Silakan login kembali.");
    if (p.role !== "admin") return err(403, "Akses ditolak. Hanya admin yang bisa mengakses.");
    return await adminBookings();
  }
  if (path.startsWith("/api/admin") && method === "POST") {
    const token = extractToken(event);
    if (!token) return err(401, "Token tidak ditemukan. Silakan login.");
    const p = verify(token);
    if (!p) return err(401, "Token expired. Silakan login kembali.");
    if (p.role !== "admin") return err(403, "Akses ditolak. Hanya admin yang bisa mengakses.");
    try { const body = JSON.parse(event.body || "{}"); return await adminBookingsAdmin(body); } catch (x: any) { return err(400, x.message || "Validasi gagal"); }
  }

  return err(404, "Endpoint tidak ditemukan. Periksa URL API Anda.");
};
