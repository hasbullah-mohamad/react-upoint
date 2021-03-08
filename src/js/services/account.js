export default function (requests) {
  return {
    current: () =>
      requests.get('/v1/account'),
    services: () =>
      requests.get('/v1/account/services'),
    service: id =>
      requests.get(`/v1/account/services/${id}`),
    orders: () =>
      requests.get('/v1/account/orders'),
    update: data =>
      requests.post('/v1/account/update', data),
    paymentDetailsUpdate: data =>
      requests.post('/v1/account/payment/update', data)
  };
}
