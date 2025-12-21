import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);

const trimRequired = (msg) =>
  z.preprocess(trim, z.string().min(1, msg));

export const LoginSchema = z.object({
  username: trimRequired("Username wajib diisi."),
  password: z.preprocess(
    trim,
    z.string()
      .min(1, "Password wajib diisi.")
      .min(6, "Password minimal 6 karakter.")
  ),
});
