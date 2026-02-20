import { apiRequest, createPath } from "./httpClient";

export const createCategory = (body) =>
  apiRequest("/admin/categories", { method: "POST", body });

export const listCategories = (query = {}) =>
  apiRequest("/admin/categories", { query });

export const updateCategory = ({ id, body }) =>
  apiRequest(createPath("/admin/categories/:id", { id }), {
    method: "PUT",
    body,
  });

export const deleteCategory = ({ id }) =>
  apiRequest(createPath("/admin/categories/:id", { id }), {
    method: "DELETE",
  });
