import { apiRequest } from "./httpClient";

const toListQuery = (query = {}) => ({
  ...query,
  pageSize: query.pageSize ?? query.limit,
});

export const listConversations = (query = {}) =>
  apiRequest("/admin/chat/conversations", { query: toListQuery(query) });

export const listMessages = (query = {}) =>
  apiRequest("/admin/chat/messages", { query: toListQuery(query) });

export const sendMessage = (body) =>
  apiRequest("/admin/chat/messages", { method: "POST", body });
