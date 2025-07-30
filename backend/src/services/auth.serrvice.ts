import axios from 'axios';
import jwt from 'jsonwebtoken';
import qs from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const generateCodeVerifier = () => crypto.randomBytes(32).toString('hex');

export const generateCodeChallenge = (verifier: string) =>
  crypto.createHash('sha256').update(verifier).digest('base64url');

export const getToken = async (code: string, codeVerifier: string) => {
  const clientAssertion = jwt.sign(
    {
      iss: process.env.CLIENT_ID,
      sub: process.env.CLIENT_ID,
      aud: process.env.ESIGNET_TOKEN_URL,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300,
    },
    process.env.PRIVATE_KEY as string,
    { algorithm: 'RS256' }
  );

  const response = await axios.post(
    process.env.ESIGNET_TOKEN_URL as string,
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_assertion: clientAssertion,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      code_verifier: codeVerifier,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
};

export const getUserInfo = async (accessToken: string) => {
  const res = await axios.get(process.env.ESIGNET_USERINFO_URL as string, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return jwt.decode(res.data) as Record<string, any>;
};
