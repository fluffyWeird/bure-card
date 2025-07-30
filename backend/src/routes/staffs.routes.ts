import { registerUser,loginUser, logoutUser } from "../controller/login.controller";

import express from 'express'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router