export default function (requests) {
  return {
    bills: () =>
      requests.get('/v1/bills'),
    billPdf: (statement) =>
      requests.file(`/v1/bills/${statement}/pdf`),
    paymentsInfo: () =>
      requests.get(`/v1/payments/info`),
    payOverdueCharges: (data) =>
      requests.post(`/v1/payments/info`, data),
  };
}
