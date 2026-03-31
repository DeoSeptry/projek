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

// Helper untuk nomor HP dengan validasi pattern
const normalizePhoneNumberInput = (v) => {
  if (typeof v !== "string") return v;
  return v.trim().replace(/[\s-]/g, "");
};

const phoneNumberValidation = () =>
  z.preprocess(
    normalizePhoneNumberInput,
    z.string()
      .min(1, "Nomor HP wajib diisi.")
      .regex(
        /^((\+62)|62|0)8[1-9][0-9]{7,11}$/,
        "Invalid string: must match pattern /^((\\+62)|62|0)8[1-9][0-9]{7,11}$/"
      )
  );
export const AvatarSchema = z
  .object({
    url: z.string().url(),
    thumbnailUrl: z.string().url(),
  })
  .nullable();

export const ParentItemSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  nisn: z.string(),
  studentName: z.string(),
  parentName: z.string(),
  grade: z.coerce.number(),
  username: z.string(),
  phoneNumber: z.string(),
  avatar: AvatarSchema.optional(), // ✅ fixed
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

export const ParentCreateSchema = z
  .object({
    nisn: nisnValidation(),
    studentName: requiredTrimmed("Nama siswa wajib diisi."),
    parentName: requiredTrimmed("Nama orang tua wajib diisi."),
    username: requiredTrimmed("Username wajib diisi."),
    phoneNumber: phoneNumberValidation(),
    password: passwordTrimmed("Password wajib diisi.", 6),
    confirmPassword: requiredTrimmed("Konfirmasi password wajib diisi."),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password harus sama.",
  });

export const ParentUpdateSchema = z.object({
  nisn: nisnValidation(),
  studentName: requiredTrimmed("Nama siswa wajib diisi."),
  parentName: requiredTrimmed("Nama orang tua wajib diisi."),
  username: requiredTrimmed("Username wajib diisi."),
  phoneNumber: phoneNumberValidation(),
});