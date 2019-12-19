import axios from 'axios';

import { getNavigator, getResolution, isMobile } from '../../utils';

import config from './base.api.config';

const api = axios.create({
  baseURL: config.apiEndpoint,
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
});

const baseData = {
  gNavigator: getNavigator(),
  gResolution: getResolution(window),
  gDevice: isMobile(navigator.userAgent) ? 'M' : 'D',
  gApp: 'XPTO',
  USR_LANGUAGE: navigator.language.split('-')[0],
  USR_APP: 'XPTO',
  USR_REMEMBERME: true, //TODO: working as remberme is always checked - we should implment this
};

export const AJAX_ACTIONS = {
  CONNECT: 'connect',
  INSCRIPTION_B2B_LOAD: 'subscribe_end_b2b_load',
  INSCRIPTION_B2B_COMMIT: 'subscribe_end_b2b_commit',
  LIST: 'list',
  LISTALL: 'listall',
  DEFINE_CURRENT: 'definecurrent',
  UPDATE: 'update',
  UPDATEFIELD: 'updatefield',
  SAVE: 'save',
  PASSWORD: 'password',
};

export const ENDPOINTS = {
  USR: '/ajax_usr.php',
  TASK: '/ajax_uta.php',
  SERVICE: '/ajax_usc.php',
  THEME: '/ajax_the.php',
  QUESTION: '/ajax_qtt.php',
  ANSWER: '/ajax_usa.php',
  MOBILITY: '/ajax_uck.php',
  // TRADUCTION: '/ajax_trn.php',
};

/**
 * Serves as a bottleneck of all requests.
 * Implenting cach service or request middleware will be more easier
 * Do not forget to return API(...args) to execute the request if no cach provided
 * Inspired by :
 * @see https://github.com/agraboso/redux-api-middleware#rsaafetch
 */
const apiCreator = (ajaxAction) => (url) => async (data) => {
  const res = await api({ url, data: { ajaxAction, ...baseData, ...data } });
  // As marked into the doc, if gSesGuid is === 0 then an error occur (like 403 response !)
  // So we throw an error
  if (res.status === 200 && res.data.gSesGuid !== 0) {
    return res.data;
  } else {
    throw new Error(JSON.stringify(res.data));
  }
};

export const authApi = apiCreator(AJAX_ACTIONS.CONNECT)(ENDPOINTS.USR);
export const profilesApi = apiCreator(AJAX_ACTIONS.LIST)(ENDPOINTS.USR);
export const subscribeApi = {
  load: apiCreator(AJAX_ACTIONS.INSCRIPTION_B2B_LOAD)(ENDPOINTS.USR),
  commit: apiCreator(AJAX_ACTIONS.INSCRIPTION_B2B_COMMIT)(ENDPOINTS.USR),
};
export const userProfileApi = {
  updatePassword: apiCreator(AJAX_ACTIONS.PASSWORD)(ENDPOINTS.USR),
  save: apiCreator(AJAX_ACTIONS.SAVE)(ENDPOINTS.USR),
};
export const themesApi = apiCreator(AJAX_ACTIONS.LIST)(ENDPOINTS.THEME);
export const servicesApi = apiCreator(AJAX_ACTIONS.LIST)(ENDPOINTS.SERVICE);
export const tasksApi = {
  list: apiCreator(AJAX_ACTIONS.LIST)(ENDPOINTS.TASK),
  update: apiCreator(AJAX_ACTIONS.UPDATEFIELD)(ENDPOINTS.TASK),
};
export const mobilitiesApi = {
  list: apiCreator(AJAX_ACTIONS.LIST)(ENDPOINTS.MOBILITY),
  defineCurrent: apiCreator(AJAX_ACTIONS.DEFINE_CURRENT)(ENDPOINTS.MOBILITY),
  update: apiCreator(AJAX_ACTIONS.UPDATE)(ENDPOINTS.MOBILITY),
};
export const questionsApi = {
  list: apiCreator(AJAX_ACTIONS.LISTALL)(ENDPOINTS.QUESTION),
  update: apiCreator(AJAX_ACTIONS.SAVE)(ENDPOINTS.ANSWER),
};
// export const traductionApi = apiCreator(AJAX_ACTIONS.LIST)(
//   ENDPOINTS.TRADUCTION,
// );

export default apiCreator;
