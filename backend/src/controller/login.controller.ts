import { Request, Response } from 'express';
import { hashPassword, validatePassword } from '../utils/hash';
import { Staffs } from '../models/staff.model';
import { signToken, verifyToken } from '../utils/genToken';
import { cookieOptions } from '../utils/CookieOptions';

// REGISTER
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

    res.cookie("accessToken", token, cookieOptions);

    return res.status(201).json({
      message: "User registered successfully",
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

// LOGIN
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

    res.cookie("accessToken", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

// LOGOUT
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", cookieOptions);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: (error as Error).message });
  }
};

// GET USER INFO
// GET /api/auth/me
export const getUserInfo = (req: Request, res: Response) => {
   const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  try {
    const user = verifyToken(token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
