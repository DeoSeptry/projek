// schemas/profile/profile.schema.js
import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);

// Helper untuk optional string yang bisa kosong
const optionalString = z.preprocess(
  trim,
  z.string().optional().or(z.literal(""))
);

// Helper untuk optional string dengan min length jika diisi
const optionalStringWithMin = (minLength, message) =>
  z.preprocess(
    trim,
    z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => {
          if (!val || val === "") return true; // Boleh kosong
          return val.length >= minLength; // Kalau diisi, min length
        },
        { message }
      )
  );

export const ProfileAvatarSchema = z
  .object({
    url: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
  })
  .nullable()
  .optional();

export const ProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().optional(),
  role: z.string(),
  avatar: ProfileAvatarSchema,
});

export const ProfileGetResponseSchema = z.object({
  status: z.boolean(),
  code: z.coerce.number(),
  message: z.string(),
  data: ProfileSchema,
});

/**
 * PATCH /profile
 * Semua field OPTIONAL - hanya kirim yang berubah
 * body: name?, username?, phoneNumber?, password?, confirmPassword?
 */
export const ProfileUpdateSchema = z
  .object({
    name: optionalString,
    username: optionalString,
    phoneNumber: optionalString,
    password: optionalStringWithMin(
      6,
      "Password minimal 6 karakter jika diisi"
    ),
    confirmPassword: optionalString,
  })
  .refine(
    (val) => {
      const password = val.password?.trim() || "";
      const confirmPassword = val.confirmPassword?.trim() || "";

      // Jika password kosong, skip validation
      if (!password) return true;

      // Jika password diisi, confirmPassword harus sama
      return password === confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Konfirmasi password harus sama dengan password",
    }
  )
  .refine(
    (val) => {
      // At least one field must be filled
      const hasName = val.name?.trim();
      const hasUsername = val.username?.trim();
      const hasPhone = val.phoneNumber?.trim();
      const hasPassword = val.password?.trim();

      return hasName || hasUsername || hasPhone || hasPassword;
    },
    {
      message: "Minimal satu field harus diisi untuk update profil",
      path: ["name"], // Show error on first field
    }
  );

/**
 * POST /profile/avatar
 * body: avatar (file)
 */
export const ProfileAvatarUploadSchema = z.object({
  avatar: z
    .any()
    .refine((f) => f instanceof File, "Avatar wajib berupa file")
    .refine(
      (f) => f.size <= 5 * 1024 * 1024,
      "Ukuran file maksimal 5MB"
    )
    .refine(
      (f) =>
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          f.type
        ),
      "Format file harus PNG, JPG, JPEG, atau WebP"
    ),
});