import { z } from "zod";

const trim = (v) => (typeof v === "string" ? v.trim() : v);

const trimRequired = (msg) =>
  z.preprocess(trim, z.string().min(1, msg));

export const LoginSchema = z.object({
  username: trimRequired("Username wajib diisi."),
  // Login hanya cek non-empty — panjang minimum divalidasi saat create/update password.
  password: trimRequired("Password wajib diisi."),
});
