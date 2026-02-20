import { apiRequest, createPath } from "./httpClient";

const toListQuery = (query = {}) => ({
  ...query,
  pageSize: query.pageSize ?? query.limit,
});

export const listEventCreators = (query = {}) =>
  apiRequest("/admin/event-creators", { query: toListQuery(query) });

export const getEventCreatorById = ({ id }) =>
  apiRequest(createPath("/admin/event-creators/:id", { id }));

export const payoutEventCreator = ({ id, body = {} }) =>
  apiRequest(createPath("/admin/event-creators/:id/payout", { id }), {
    method: "POST",
    body,
  });
