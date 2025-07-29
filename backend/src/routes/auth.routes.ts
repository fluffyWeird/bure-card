import { Router } from 'express';
import { login, callback } from '../controller/auth.controller';

const router = Router();

router.get('/login', login);
router.get('/callback', callback);

export default router;
