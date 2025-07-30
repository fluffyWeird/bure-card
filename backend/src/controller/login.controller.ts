import { Request, Response } from 'express';
import { hashPassword, validatePassword } from '../utils/hash';
import { Staffs } from '../models/staff.model';
import { signToken, verifyToken } from '../utils/genToken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await Staffs.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPass = await hashPassword(req.body.password);
    const newUser = await Staffs.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const token = signToken(newUser.email, newUser.username);

    return res.status(201).json({
      message: "User registered successfully",
      username: newUser.username,
      email: newUser.email,
      token, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await Staffs.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await validatePassword(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user.email, user.username);

    return res.status(200).json({
      message: "Login successful",
      token, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Logout successful. Remove token on client side." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

export const authenticateToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
