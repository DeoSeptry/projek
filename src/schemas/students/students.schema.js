import { z } from "zod";

export const StudentItemSchema = z.object({
  id: z.string(),
  studentName: z.string(),
  teacherName: z.string(),
  grade: z.coerce.number(),
  isGraduated: z.coerce.boolean(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StudentsMetaSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  totalPages: z.coerce.number(),
  totalResults: z.coerce.number(),
  filter: z.any().optional(), // backend kirim {}
  sort: z.string().optional(),
  order: z.string().optional(),
});

export const StudentsListResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.array(StudentItemSchema),
  meta: StudentsMetaSchema.optional(),
});

export const StudentsTotalResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: z.object({
    grade1: z.coerce.number(),
    grade2: z.coerce.number(),
    grade3: z.coerce.number(),
    grade4: z.coerce.number(),
    grade5: z.coerce.number(),
    grade6: z.coerce.number(),
  }),
});

export const StudentsBulkActionSchema = z.object({
  studentIds: z
    .array(z.string().min(1))
    .min(1, "Minimal pilih 1 siswa."),
});
