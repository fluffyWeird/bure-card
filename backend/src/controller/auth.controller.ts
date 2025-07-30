import { Request, Response } from 'express';
import { generateCodeVerifier, generateCodeChallenge, getToken, getUserInfo } from '../services/auth.serrvice';
import {Users} from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';


let codeVerifierStore: Record<string, string> = {};

export const login = (req: Request, res: Response) => {
  const state = uuidv4();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  codeVerifierStore[state] = codeVerifier;

  const authUrl = `${process.env.ESIGNET_AUTH_URL}?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI!)}&scope=openid%20profile%20email&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  res.redirect(authUrl);
};

export const callback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    if (!code || !state || !codeVerifierStore[state as string]) return res.status(400).json({ error: 'Invalid state or code' });

    const tokens = await getToken(code as string, codeVerifierStore[state as string]);
    const userInfo = await getUserInfo(tokens.access_token);

    let user = await Users.findOne({ sub: userInfo.sub });
    if (!user) {
      user = await Users.create({
        sub: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        gender: userInfo.gender,
        birthdate: userInfo.birthdate,
      });
    }

    res.json({ message: 'User authenticated', user, tokens });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
