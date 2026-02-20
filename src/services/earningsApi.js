import { apiRequest, createPath } from "./httpClient";

const toListQuery = (query = {}) => ({
  ...query,
  pageSize: query.pageSize ?? query.limit,
});

export const listEarningTransactions = (query = {}) =>
  apiRequest("/admin/earnings/transactions", { query: toListQuery(query) });

export const getEarningTransactionById = ({ id }) =>
  apiRequest(createPath("/admin/earnings/transactions/:id", { id }));

export const generateEarningInvoice = ({ id, body = {} }) =>
  apiRequest(createPath("/admin/earnings/transactions/:id/invoice", { id }), {
    method: "POST",
    body,
  });
