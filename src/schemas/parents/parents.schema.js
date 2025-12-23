import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);

// Helper untuk required string dengan trim
const requiredTrimmed = (msg) => z.preprocess(trim, z.string().min(1, msg));

// Helper untuk password dengan trim dan min length
const passwordTrimmed = (msg, minLength = 6) => 
  z.preprocess(trim, z.string().min(1, msg).min(minLength, `Password minimal ${minLength} karakter.`));

// Helper untuk NISN dengan validasi pattern
const nisnValidation = () => 
  z.preprocess(
    trim, 
    z.string()
      .min(1, "NISN wajib diisi.")
      .regex(/^(?!0{10})[0-9]{10}$/, "NISN harus 10 digit angka dan tidak boleh semua nol.")
  );

export const ParentItemSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  nisn: z.string(),
  studentName: z.string(),
  parentName: z.string(),
  grade: z.coerce.number(),
  username: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ParentsListResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(ParentItemSchema),
  meta: z
    .object({
      page: z.coerce.number(),
      limit: z.coerce.number(),
      totalPages: z.coerce.number(),
      totalResults: z.coerce.number(),
      sort: z.string().optional(),
      order: z.string().optional(),
    })
    .optional(),
});

export const ParentDetailResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: ParentItemSchema,
});

/**
 * CREATE body:
 * nisn, studentName, parentName, username, password, confirmPassword, phoneNumber
 */
export const ParentCreateSchema = z
  .object({
    nisn: nisnValidation(),
    studentName: requiredTrimmed("Nama siswa wajib diisi."),
    parentName: requiredTrimmed("Nama orang tua wajib diisi."),
    username: requiredTrimmed("Username wajib diisi."),
    phoneNumber: requiredTrimmed("Nomor HP wajib diisi."),
    password: passwordTrimmed("Password wajib diisi.", 6),
    confirmPassword: requiredTrimmed("Konfirmasi password wajib diisi."),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password harus sama.",
  });

/**
 * UPDATE PATCH body:
 * (umumnya sama seperti create, tapi password optional)
 */
export const ParentUpdateSchema = z.object({
  nisn: nisnValidation(),
  studentName: requiredTrimmed("Nama siswa wajib diisi."),
  parentName: requiredTrimmed("Nama orang tua wajib diisi."),
  username: requiredTrimmed("Username wajib diisi."),
  phoneNumber: requiredTrimmed("Nomor HP wajib diisi."),
});