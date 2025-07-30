import { importJWK, SignJWT } from 'jose';

export const generateSignedJwt = async (): Promise<string> => {
  const {
    CLIENT_ID,
    TOKEN_ENDPOINT,
    PRIVATE_KEY_BASE64
  } = process.env;

  if (!CLIENT_ID || !TOKEN_ENDPOINT || !PRIVATE_KEY_BASE64) {
    throw new Error("Missing environment variables");
  }

  const header = { alg: 'RS256', typ: 'JWT' };

  const payload = {
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: TOKEN_ENDPOINT
  };

  const jwkJson = Buffer.from(PRIVATE_KEY_BASE64, 'base64').toString();
  const jwk = JSON.parse(jwkJson);
  const privateKey = await importJWK(jwk, 'RS256');

  return await new SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);
};