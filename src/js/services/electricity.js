export default function (requests) {
  return {
    compare: data =>
      requests.post('/v1/electricity/compare', data),
    order: data =>
      requests.post('/v1/energy/order', data)
  };
}
