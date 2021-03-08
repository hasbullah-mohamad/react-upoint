import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { env } from '../config';
import { default as jwtDecode } from 'jwt-decode';
import { tokenStorage } from '../helpers';

import createAccountService from './account';
import createOrdersService from './orders';
import createAuthService from './auth';
import createTiabService from './tiab';
import createServicesService from './services';
import createBillsService from './bills';
import createElectricityService from './electricity';
import createNbnService from './nbn';
import createMiscService from './misc';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = env.apiLocation;

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
};

const validateToken = (jwtToken) => {
  try {
    const decoded = jwtDecode(jwtToken);

    const currentTime = new Date().getTime() / 1000;
    if (currentTime > decoded.exp) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const refreshAuthToken = () => {
  console.log('Refreshing JWT token');
  return superagent.post(`${API_ROOT}/auth/refresh`).use(tokenPlugin).use(wantsJson).then(responseBody).then((res) => {
    token = res.access_token;
    tokenStorage.setToken(token);
  });
};

const interceptWithTokenValidation = (executeRequest) => {
  if (validateToken(token) || !token) {
    console.log('JWT valid - PROCEED');
    return executeRequest();
  }
  console.log('JWT invalid - REFRESH');
  return refreshAuthToken().then(executeRequest);
};

const wantsJson = (req) => {
  req.set('Accept', 'application/json');
};

const requests = {
  del: url => interceptWithTokenValidation(() => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).use(wantsJson).then(responseBody)),
  get: url => interceptWithTokenValidation(() => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).use(wantsJson).then(responseBody)),
  file: url => interceptWithTokenValidation(() => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin)).responseType('blob'),

  put: (url, body) => interceptWithTokenValidation(() => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).use(wantsJson).then(responseBody)),

  post: (url, body) => interceptWithTokenValidation(() => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).use(wantsJson).then(responseBody))
};

const Bills = createBillsService(requests);
const Account = createAccountService(requests);
const Orders = createOrdersService(requests);
const Auth = createAuthService(requests);
const Tiab = createTiabService(requests);
const Services = createServicesService(requests);
const Electricity = createElectricityService(requests);
const Nbn = createNbnService(requests);
const Misc = createMiscService(requests);

const isLoggedIn = () => {
  const hasAuthToken = !!token;
  return hasAuthToken;
};

export default {
  Electricity,
  Bills,
  Orders,
  Auth,
  Tiab,
  Account,
  Nbn,
  Misc,
  Services,
  setToken: (_token) => { token = _token; },
  isLoggedIn
};
