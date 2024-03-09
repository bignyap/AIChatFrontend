import React, {useState, useEffect, useRef} from "react";
import Keycloak from "keycloak-js";
import config from "../config";

const client = new Keycloak({
  url: config.authUrl,
  realm: config.authRealm,
  clientId: config.authClientId,
});

export default function useAuth () {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(
    () => {
      if (isRun.current) return;
      isRun.current = true;
      client.init({
        onLoad: "login-required"
      })
      .then((res) => {
        setLogin(res)
      });
    }, []
  );
  return [isLogin, token];
}
