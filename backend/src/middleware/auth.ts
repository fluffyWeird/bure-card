import { verifyToken } from "../utils/genToken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export function loggedInAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken; // Get token from HTTP-only cookie
console.log("Token from cookie:", token);
  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(403).json({ message: "Invalid token!" });
    }

    // Optionally attach user info to request
    (req as any).user = payload;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Authentication failed!" });
  }
}
