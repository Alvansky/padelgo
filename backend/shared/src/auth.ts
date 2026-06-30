import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserItem, EnvConfig } from "./types.js";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload, env: EnvConfig): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRY || "2h",
  });
}

export function verifyToken(token: string, env: EnvConfig): TokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function buildUserResponse(user: UserItem) {
  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone || "",
    createdAt: user.createdAt,
  };
}
