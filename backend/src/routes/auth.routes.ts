import express from "express";
import { exchangeCodeForToken, fetchUserInfo } from "../controller/auth.controller";

const router = express.Router();

router.post("/token", exchangeCodeForToken);
router.post("/userinfo", fetchUserInfo);

export default router;
