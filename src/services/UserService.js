import Keycloak from "keycloak-js";
import keycloakConfig from "../keycloak";

const _kc = new Keycloak(keycloakConfig);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    // onLoad: 'login-required',
    // pkceMethod: 'S256',
  })
    .then((authenticated) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        console.log("User not authenticated.");
        doLogin();
      }
    })
    .catch((error) => {
      console.error("Error initializing Keycloak:", error);
      // Handle the error appropriately, such as displaying an error message to the user or redirecting to an error page.
    });
};


const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const requireLogin = (callback) => {
  if (isLoggedIn()) {
    callback();
  } else {
    doLogin();
  }
};

const UserService = {
  initKeycloak,
  doLogin,
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
