const KEY = "auth_user_v1";


export function saveAuthUser(payload) {
  if (!payload?.user) return false;
  
  try {
    const data = {
      user: payload.user,
      role: payload.role,
      timestamp: Date.now(),
      version: 1
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save auth:', error);
    return false;
  }
}

export function loadAuthUser() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    
    const data = JSON.parse(raw);
    
    // Validasi struktur data
    if (!data.user || !data.version) {
      clearAuthUser();
      return null;
    }
    
    // Cek expiry (opsional, misal 7 hari)
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - data.timestamp > maxAge) {
      clearAuthUser();
      return null;
    }
    
    return { user: data.user, role: data.role };
  } catch (error) {
    console.error('Failed to load auth:', error);
    clearAuthUser();
    return null;
  }
}
export function clearAuthUser() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
