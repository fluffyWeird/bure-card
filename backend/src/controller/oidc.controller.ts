import { Request, Response } from 'express';
import { getToken, getUserInfo as getUserInfoService } from '../services/auth.serrvice';

export const exchangeToken = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // For frontend flow, we need to generate a code verifier
    const codeVerifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
    
    const tokens = await getToken(code, codeVerifier);
    
    res.json({ access_token: tokens.access_token });
  } catch (error) {
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    
    if (!access_token) {
      return res.status(400).json({ error: 'Missing access token' });
    }

    const userInfo = await getUserInfoService(access_token);
    
    res.json(userInfo);
  } catch (error) {
    console.error('User info error:', error);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
}; 