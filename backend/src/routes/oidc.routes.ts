import { Router } from 'express';
import { exchangeToken, getUserInfo } from '../controller/oidc.controller';

const router = Router();

// POST /api/token - Exchange authorization code for access token
router.post('/token', exchangeToken);

// POST /api/userinfo - Get user info using access token
router.post('/userinfo', getUserInfo);

export default router;