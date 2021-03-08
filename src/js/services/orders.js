export default function (requests) {
  return {
    create: data =>
      requests.post('/v1/orders/create', data),
    activate: data =>
      requests.post('/v1/orders/activate', data),
    orderService: data =>
      requests.post('/v1/orders/order-service', data),
    addService: data =>
      requests.post('/v1/orders/add-service', data),
    activateService: data =>
      requests.post('/v1/orders/activate-service', data)
  };
}
