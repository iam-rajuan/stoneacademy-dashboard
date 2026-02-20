import { apiRequest, createPath } from "./httpClient";

export const listAds = (query = {}) => apiRequest("/admin/ads", { query });

export const createAd = (body) =>
  apiRequest("/admin/ads", {
    method: "POST",
    body,
    contentType: body instanceof FormData ? null : "application/json",
  });

export const updateAd = ({ id, body }) =>
  apiRequest(createPath("/admin/ads/:id", { id }), {
    method: "PUT",
    body,
    contentType: body instanceof FormData ? null : "application/json",
  });

export const deleteAd = ({ id }) =>
  apiRequest(createPath("/admin/ads/:id", { id }), {
    method: "DELETE",
  });

export const updateAdStatus = ({ id, body }) =>
  apiRequest(createPath("/admin/ads/:id/status", { id }), {
    method: "PATCH",
    body,
  });
