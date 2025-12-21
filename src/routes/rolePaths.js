export function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

export function getHomePathByRole(role) {
  const r = normalizeRole(role);

  if (r === "superadmin") return "/homeKepsek";
  if (r === "teacher") return "/homeWalkel";
  if (r === "parent") return "/homeWalmur";

  return "/login";
}
