import { EnvConfig } from "./types.js";

export function corsHeaders(env: EnvConfig): Record<string, string> {
  const origin = env.CORS_ORIGIN || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  };
}

export function jsonResponse<T>(
  statusCode: number,
  data: T,
  env: EnvConfig,
  cookies: string[] = []
): { statusCode: number; headers: Record<string, string>; body: string; cookies?: string[] } {
  const headers = corsHeaders(env);
  headers["Cache-Control"] = "no-store";

  const cookieHeader = cookies.join("; ");
  if (cookieHeader) {
    headers["Set-Cookie"] = cookieHeader;
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(data),
    cookies,
  };
}

export function errorResponse(
  statusCode: number,
  message: string,
  env: EnvConfig,
  details?: unknown
): { statusCode: number; headers: Record<string, string>; body: string } {
  const headers = corsHeaders(env);
  const body: Record<string, unknown> = { error: message };
  if (details !== undefined) body.details = details;

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

export function parseBody<T>(body: string | null): { data: T; error: null } | { data: null; error: string } {
  if (!body) return { data: null, error: "Request body kosong" };
  try {
    const parsed = JSON.parse(body);
    return { data: parsed as T, error: null };
  } catch {
    return { data: null, error: "Format JSON tidak valid" };
  }
}

export function getEnv(env: Record<string, string | undefined>): { ok: true; value: Record<string, string> } | { ok: false; error: string } {
  const required = ["USERS_TABLE", "COURTS_TABLE", "BOOKINGS_TABLE", "JWT_SECRET"];
  const missing = required.filter((k) => !env[k]);
  if (missing.length > 0) {
    return { ok: false, error: `Missing env vars: ${missing.join(", ")}` };
  }
  return {
    ok: true,
    value: {
      USERS_TABLE: env.USERS_TABLE!,
      COURTS_TABLE: env.COURTS_TABLE!,
      BOOKINGS_TABLE: env.BOOKINGS_TABLE!,
      JWT_SECRET: env.JWT_SECRET!,
      JWT_EXPIRY: env.JWT_EXPIRY || "2h",
      CORS_ORIGIN: env.CORS_ORIGIN || "*",
      API_BASE_URL: env.API_BASE_URL || "/api",
      NODE_ENV: env.NODE_ENV || "production",
    },
  };
}

export function buildCookie(
  name: string,
  value: string,
  maxAgeSeconds: number,
  httpOnly = true,
  secure = true,
  sameSite: "strict" | "lax" | "none" = "strict",
  path = "/"
): string {
  const parts = [
    `${name}=${value}`,
    `Max-Age=${maxAgeSeconds}`,
    "Path=" + path,
    "HttpOnly",
    "SameSite=" + sameSite,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function clearCookie(name: string, path = "/"): string {
  return buildCookie(name, "", 0, true, true, "strict", path);
}
