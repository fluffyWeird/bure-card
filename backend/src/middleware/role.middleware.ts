import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/genToken"; 

export const doctorOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = verifyToken(token) as any;

    if (decoded.userRole === "doc") {
      next(); 
    } else {
      return res.status(403).json({ message: "Forbidden: Doctor role required" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
