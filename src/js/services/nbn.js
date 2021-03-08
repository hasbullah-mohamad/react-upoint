export default function (requests) {
  return {
    addressCoverage: data => requests.post('/v1/nbn/address/coverage', data),
    createOrder: data => requests.post('/v1/nbn/order', data)
  };
}
