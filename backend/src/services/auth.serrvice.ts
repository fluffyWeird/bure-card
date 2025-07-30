import axios from 'axios';
import qs from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { generateSignedJwt } from '../utils/jwtGenerator'

export const generateCodeVerifier = (): string => 
  crypto.randomBytes(32).toString('hex');

export const generateCodeChallenge = (verifier: string): string =>
  crypto.createHash('sha256').update(verifier).digest('base64url');

export const getToken = async (code: string, codeVerifier: string) => {
  const clientAssertion = await generateSignedJwt();

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
  return res.data as Record<string, any>;
};