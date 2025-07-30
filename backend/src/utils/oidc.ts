export const getOIDCConfig = () => ({
  AUTHORIZATION_ENDPOINT: process.env.AUTHORIZATION_ENDPOINT || "https://example.com/oidc/authorize",
  TOKEN_ENDPOINT: process.env.TOKEN_ENDPOINT || "https://example.com/oidc/token",
  USERINFO_ENDPOINT: process.env.USERINFO_ENDPOINT || "https://example.com/oidc/userinfo",
  CLIENT_ID: process.env.CLIENT_ID || "your-client-id",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "your-client-secret",
  REDIRECT_URI: process.env.REDIRECT_URI || "http://localhost:5173/callback",
  CLIENT_ASSERTION_TYPE: process.env.CLIENT_ASSERTION_TYPE|| "",
});
