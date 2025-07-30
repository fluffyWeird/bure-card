import { registerUser,loginUser, logoutUser, getUserInfo } from "../controller/login.controller";

import express from 'express'

const router = express.Router()

router.get('/me', getUserInfo)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)


export default router