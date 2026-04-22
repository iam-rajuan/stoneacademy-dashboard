const ADMIN_PROFILE_CACHE_KEY = "stoneacademy.adminProfile";

export const readCachedAdminProfile = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ADMIN_PROFILE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writeCachedAdminProfile = (profile = {}) => {
  if (typeof window === "undefined") return;

  const current = readCachedAdminProfile() || {};
  const next = {
    ...current,
    ...profile,
  };

  try {
    window.localStorage.setItem(ADMIN_PROFILE_CACHE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private mode.
  }
};
