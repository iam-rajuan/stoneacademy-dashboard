const AUTH_KEY = "adminAuth";

export const setAdminSession = ({ email }) => {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      email,
      loggedInAt: new Date().toISOString(),
    })
  );
};

export const getAdminSession = () => {
  const stored = localStorage.getItem(AUTH_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const isAdminAuthenticated = () => Boolean(getAdminSession());

export const clearAdminSession = () => {
  localStorage.removeItem(AUTH_KEY);
};
