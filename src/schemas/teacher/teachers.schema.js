import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);

const requiredTrimmedString = (msg) =>
  z.preprocess(trim, z.string().min(1, msg));

/** Kelas tertinggi di SD. Siswa di kelas ini diluluskan, bukan dinaikkan. */
export const FINAL_GRADE = 6;

export const TeacherItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.coerce.number(),
  username: z.string(),
  avatar: z.any().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TeacherListResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(TeacherItemSchema),
  meta: z
    .object({
      totalResults: z.coerce.number(),
    })
    .optional(),
});

export const TeacherDetailResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: TeacherItemSchema,
});

/**
 * Body create:
 * name, username, password, confirmPassword, grade
 */
export const TeacherCreateSchema = z
  .object({
    name: requiredTrimmedString("Nama wajib diisi."),
    username: requiredTrimmedString("Username wajib diisi."),
    grade: z.coerce
      .number()
      .min(1, "Grade minimal 1.")
      .max(FINAL_GRADE, `Grade maksimal ${FINAL_GRADE}.`),
    password: z.preprocess(
      trim,
      z.string().min(1, "Password wajib diisi.").min(8, "Password minimal 8 karakter.")
    ),
    confirmPassword: z.preprocess(
      trim,
      z.string().min(1, "Konfirmasi password wajib diisi.")
    ),
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak sama.",
  });
