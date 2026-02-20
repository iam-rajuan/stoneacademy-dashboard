const DEFAULT_API_BASE_URL =
  "https://informal-vehicles-leadership-monitors.trycloudflare.com";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL.replace(/\/+$/, "")}${normalizedPath}`;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
};

const extractApiErrorMessage = (payload) => {
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors[0]?.message;
  }

  return payload?.message || payload?.error;
};

export const loginAdmin = async ({ email, password }) => {
  const endpointCandidates = [
    "/auth/admin/login",
    "/api/v1/auth/admin/login",
    "/api/v1/auth/login",
    "/auth/login",
  ];

  let lastErrorMessage = "Login failed. Please try again.";

  for (const endpoint of endpointCandidates) {
    const response = await fetch(buildApiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await parseResponse(response);

    if (response.ok) {
      return payload;
    }

    const errorMessage = extractApiErrorMessage(payload);
    if (errorMessage) {
      lastErrorMessage = errorMessage;
    }

    if (response.status !== 404) {
      throw new Error(lastErrorMessage);
    }
  }

  throw new Error(lastErrorMessage);
};
