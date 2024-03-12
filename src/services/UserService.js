import Keycloak from "keycloak-js";
import keycloakConfig from "../keycloak";

const _kc = new Keycloak(keycloakConfig);

async function initKeycloak() {
  try {
    await _kc.init({ onLoad: 'login-required' });
    return true; // Return true if initialization is successful
  } catch (error) {
    throw error;
  }
}

// const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(_kc.login());

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const requireLogin = (callback) => {
  if (isLoggedIn()) {
    callback();
  } else {
    _kc.login();
  }
};

const UserService = {
  initKeycloak,
  // doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  requireLogin,
};

export default UserService;
