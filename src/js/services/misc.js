export default function (requests) {
  return {
    registerInterest: (key, data) => {
      data['key'] = key;
      return requests.post('/v1/interest/register', data);
    },
  };
}
