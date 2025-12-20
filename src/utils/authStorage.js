const KEY = "auth_user_v1";

export function loadAuthUser() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.user || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAuthUser(payload) {
  try {
    localStorage.setItem(KEY, JSON.stringify(payload)); // { user, role }
  } catch {}
}

export function clearAuthUser() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
