export default function (requests) {
  return {
    validateSimNumber: number =>
      requests.get(`/v1/validateSim/${number}`)
  };
}
