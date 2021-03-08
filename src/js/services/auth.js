export default function (requests) {
  return {
    login: (email, password) =>
      requests.post('/auth/login', { email, password }),
    saml: (data) =>
      requests.post('/auth/saml', data),
    register: data =>
      requests.post('/auth/register', data),
    resetPasswordRequest: email =>
      requests.post('/auth/password/email', { email }),
    resetPassword: data =>
      requests.post('/auth/password/reset', data)
  };
}
