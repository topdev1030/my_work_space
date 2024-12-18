const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV || "dev";

const getConfig = () => {
  switch (ENV) {
    case "prod":
      return {
        api: {
          baseUrl: process.env.REACT_APP_LOCAL_API_BASEURL || "",
          mode: "local",
          timeout: 60000,
        },
        auth0: {
          baseUrl: process.env.REACT_APP_LOCAL_AUTH0_BASEURL || "",
          audienceAuth0: process.env.REACT_APP_LOCAL_AUDIENCE_AUTH0 || "",
          clientSecretForApi:
            process.env.REACT_APP_LOCAL_CLIENT_SECRETFOR_API || "",
          grantType: process.env.REACT_APP_GRANT_TYPE || "",
          clientIdForApi: process.env.REACT_APP_LOCAL_CLIENT_ID_FOR_API || "",
          domain: process.env.REACT_APP_LOCAL_DOMAIN || "",
          audience: process.env.REACT_APP_LOCAL_AUDIENCE || "",
          clientId: process.env.REACT_APP_LOCAL_CLIENT_ID || "",
          redirectUri: `${window.location.origin}/dashboard`,
          returnTo: window.location.origin,
          adminOrgId: process.env.REACT_APP_LOCAL_ADMIN_ORG_ID || "",
        },
        azure: {
          storageAccountName:
            process.env.REACT_APP_LOCAL_AZURE_STORAGE_ACCOUNT_NAME || "",
        },
        reCaptcha: {
          siteKey: process.env.REACT_APP_RECAPTCHA_SITEKEY || "",
        },
        vulnerabilities: {
          url: process.env.REACT_APP_VULNERABILITIES_URL || "",
          accessToken: process.env.REACT_APP_VULNERABILITIES_TOKEN || "",
        },
        feedly: {
          url: process.env.REACT_APP_FEEDLY_URL || "",
          accessToken: process.env.REACT_APP_FEEDLY_TOKEN,
        },
      };
    case "dev":
      return {
        api: {
          baseUrl: process.env.REACT_APP_LOCAL_API_BASEURL || "",
          mode: "local",
          timeout: 60000,
        },
        auth0: {
          baseUrl: process.env.REACT_APP_LOCAL_AUTH0_BASEURL || "",
          audienceAuth0: process.env.REACT_APP_LOCAL_AUDIENCE_AUTH0 || "",
          clientSecretForApi:
            process.env.REACT_APP_LOCAL_CLIENT_SECRETFOR_API || "",
          grantType: process.env.REACT_APP_GRANT_TYPE || "",
          clientIdForApi: process.env.REACT_APP_LOCAL_CLIENT_ID_FOR_API || "",
          domain: process.env.REACT_APP_LOCAL_DOMAIN || "",
          audience: process.env.REACT_APP_LOCAL_AUDIENCE || "",
          clientId: process.env.REACT_APP_LOCAL_CLIENT_ID || "",
          redirectUri: `${window.location.origin}/dashboard`,
          returnTo: window.location.origin,
          adminOrgId: process.env.REACT_APP_LOCAL_ADMIN_ORG_ID || "",
        },
        azure: {
          storageAccountName:
            process.env.REACT_APP_LOCAL_AZURE_STORAGE_ACCOUNT_NAME || "",
        },
        reCaptcha: {
          siteKey: process.env.REACT_APP_RECAPTCHA_SITEKEY || "",
        },
        vulnerabilities: {
          url: process.env.REACT_APP_VULNERABILITIES_URL || "",
          accessToken: process.env.REACT_APP_VULNERABILITIES_TOKEN || "",
        },
        feedly: {
          url: process.env.REACT_APP_FEEDLY_URL || "",
          accessToken: process.env.REACT_APP_FEEDLY_TOKEN,
        },
      };
    case "local":
    default:
      return {
        api: {
          baseUrl: process.env.REACT_APP_LOCAL_API_BASEURL || "",
          mode: "local",
          timeout: 60000,
        },
        auth0: {
          baseUrl: process.env.REACT_APP_LOCAL_AUTH0_BASEURL || "",
          audienceAuth0: process.env.REACT_APP_LOCAL_AUDIENCE_AUTH0 || "",
          clientSecretForApi:
            process.env.REACT_APP_LOCAL_CLIENT_SECRETFOR_API || "",
          grantType: process.env.REACT_APP_GRANT_TYPE || "",
          clientIdForApi: process.env.REACT_APP_LOCAL_CLIENT_ID_FOR_API || "",
          domain: process.env.REACT_APP_LOCAL_DOMAIN || "",
          audience: process.env.REACT_APP_LOCAL_AUDIENCE || "",
          clientId: process.env.REACT_APP_LOCAL_CLIENT_ID || "",
          redirectUri: `${window.location.origin}/dashboard`,
          returnTo: window.location.origin,
          adminOrgId: process.env.REACT_APP_LOCAL_ADMIN_ORG_ID || "",
        },
        azure: {
          storageAccountName:
            process.env.REACT_APP_LOCAL_AZURE_STORAGE_ACCOUNT_NAME || "",
        },
        reCaptcha: {
          siteKey: process.env.REACT_APP_RECAPTCHA_SITEKEY || "",
        },
        vulnerabilities: {
          url: process.env.REACT_APP_VULNERABILITIES_URL || "",
          accessToken: process.env.REACT_APP_VULNERABILITIES_TOKEN || "",
        },
        feedly: {
          url: process.env.REACT_APP_FEEDLY_URL || "",
          accessToken: process.env.REACT_APP_FEEDLY_TOKEN,
        },
      };
  }
};

export default getConfig();
