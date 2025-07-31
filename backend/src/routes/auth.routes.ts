import { Router } from 'express';
import {  exchangeCodeForToken,fetchUserInfo,getCurrentUser} from '../controller/auth.controller';

const router = Router();

router.post('/token', exchangeCodeForToken);
router.post('/userinfo', fetchUserInfo);
router.get('/me', getCurrentUser);


export default router;
