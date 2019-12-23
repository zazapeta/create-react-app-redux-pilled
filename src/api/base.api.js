import axios from 'axios';

import config from './base.api.config';

const api = axios.create({
  baseURL: config.apiEndpoint,
  headers: { 'Content-Type': 'application/json' },
});

const VERBS = {
  CREATE: 'POST',
  LIST: 'GET',
  READ: 'GET',
  UPDATE: 'PUT',
  REMOVE: 'DELETE',
};

export const ENDPOINTS = {
  USERS: '/users', // TODO
};

/**
 * Serves as a bottleneck of all requests.
 * Implenting cach service or request middleware will be more easier
 * Do not forget to return API(...args) to execute the request if no cach provided
 * Inspired by :
 * @see https://github.com/agraboso/redux-api-middleware#rsaafetch
 */
const apiCreator = (method) => (url) => async (data) =>
  api({
    method,
    url,
    data,
  });

export const authApi = {
  // TODO : repalce it
  login: (data) =>
    apiCreator(VERBS.CREATE)(ENDPOINTS.USERS)(data).then(
      (res) =>
        (api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.token}`),
    ),
};

export default apiCreator;
