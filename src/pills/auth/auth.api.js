import { authApi } from '../api/base.api';
import User from '../../models/user.model';
import { loadState } from '../../redux-utils/localStorage';

import { userSelector } from './auth.selectors';

/**
 * classic login as explained in the section 3.1 of the api doc
 * @param {User} - the user where to retrieve email and password field
 * @returns {Object} - return the raw data coming from the response object
 */
export async function classicLogin({
  email: USR_EMAIL,
  password: USR_PASSWORD,
}) {
  return authApi({ USR_EMAIL, USR_PASSWORD });
}

/**
 * remember me login as explained in the section 3.2 of the api doc
 * @param {User} - the user where to retrieve email and rememberMeId field
 * @returns {Object} - return the raw data coming from the response
 */
export async function rememberMeLogin({
  email: USR_REMEMBERME_EMAIL,
  rememberMeId: USR_REMEMBERME_ID,
}) {
  return authApi({ USR_REMEMBERME_EMAIL, USR_REMEMBERME_ID });
}

/**
 * after inscription login as explained in the section 3.3 of the api doc
 * @param {User} - the user where to retrieve remeberMeId and familyId field
 * @returns {Object} - return the raw data coming from the response
 */
export async function afterInscriptionLogin({
  rememberMeId: USR_REMEMBERME_ID,
  familyId: USR_REMEMBERME_FAMILY,
}) {
  return authApi({ USR_REMEMBERME_ID, USR_REMEMBERME_FAMILY });
}

/**
 * retrieve the user either:
 *  - from the current store stored in the local storage (synchronized with redux store)
 *  - as a result of a request (that may be classic, remberMe, afterInscription Login)
 * @param {fn} - function to use to do the login
 * @returns {User} - the current User as a an UserModel
 */
export async function getUser(login = classicLogin) {
  const rawUserFromState = userSelector(loadState());
  const userFromState = new User(rawUserFromState);
  const rawUser = await login(userFromState);
  return new User(rawUser);
}
