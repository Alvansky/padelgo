import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]{8,}$/;

export const emailSchema = z.string().email("Email tidak valid").max(255).toLowerCase().trim();

export const nameSchema = z.string().min(1, "Nama wajib diisi").max(100).trim();

export const phoneSchema = z.string()
  .regex(/^\+?[0-9\s\-]{8,20}$/, "Nomor telepon tidak valid")
  .optional()
  .or(z.literal(""));

export const passwordSchema = z.string()
  .min(8, "Password minimal 8 karakter")
  .regex(/[a-z]/, "Password harus mengandung huruf kecil (a-z)")
  .regex(/[A-Z]/, "Password harus mengandung huruf besar (A-Z)")
  .regex(/\d/, "Password harus mengandung angka (0-9)")
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/, "Password harus mengandung simbol (!@#$%...)");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  role: z.enum(["user"]).default("user"),
});

export const bookingCreateSchema = z.object({
  courtId: z.string().min(1, "Court ID wajib diisi"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (HH:MM)"),
  duration: z.coerce.number().int().min(1).max(4, "Maksimal durasi 4 jam"),
});

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Minimal 8 karakter");
  if (!/[a-z]/.test(password)) errors.push("Harus ada huruf kecil (a-z)");
  if (!/[A-Z]/.test(password)) errors.push("Harus ada huruf besar (A-Z)");
  if (!/\d/.test(password)) errors.push("Harus ada angka (0-9)");
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)) errors.push("Harus ada simbol (!@#$%...)");
  return { valid: errors.length === 0, errors };
}
