export function getApiErrorMessage(err, fallback = "Login gagal") {
  const e = err || {};
  return (
    e?.data?.message ||
    e?.data?.error ||
    e?.data?.msg ||
    (typeof e?.data === "string" ? e.data : null) ||
    e?.error ||
    fallback
  );
}
