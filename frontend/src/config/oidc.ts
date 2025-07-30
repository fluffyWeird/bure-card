const OIDC_CONFIG = {
  CLIENT_ID: "bure-card-client",
  REDIRECT_URI: "http://localhost:3000/callback",
  AUTHORIZATION_ENDPOINT: "http://localhost:8080/authorize", // Your Fayda auth URL
  TOKEN_ENDPOINT: "http://localhost:5000/api/token", // Your backend
  USERINFO_ENDPOINT: "http://localhost:5000/api/userinfo", // Your backend
  RESPONSE_TYPE: "code",
  SCOPE: "openid profile email",
  ACR_VALUES: "mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics",
  CLAIMS: '{"userinfo":{"name":{"essential":true},"phone":{"essential":true},"email":{"essential":true},"picture":{"essential":true},"gender":{"essential":true},"birthdate":{"essential":true},"address":{"essential":true}},"id_token":{}}',
  CODE_CHALLENGE: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  CODE_CHALLENGE_METHOD: "S256",
  DISPLAY: "page",
  NONCE: "g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g",
  STATE: "ptOO76SD",
  UI_LOCALES: "en",
};
export default OIDC_CONFIG;