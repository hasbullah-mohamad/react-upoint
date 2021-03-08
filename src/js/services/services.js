export default function (requests) {
  return {
    update: (id, data) =>
      requests.post(`/v1/services/${id}/update`, data)
  };
}
