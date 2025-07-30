import { Request, Response } from "express";
import axios from "axios";
import jwt from 'jsonwebtoken'
import { decodeJwt, jwtDecrypt } from "jose";
import { getOIDCConfig } from "../utils/oidc";
import { Users } from "../models/user.model";

export const exchangeCodeForToken = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const { TOKEN_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = getOIDCConfig();

    const response = await axios.post(
      TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.json(response.data);
  } catch (error: any) {
    console.error("Token exchange error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to exchange token" });
  }
};

export const fetchUserInfo = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    const { USERINFO_ENDPOINT } = getOIDCConfig();

    const response = await axios.get(USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userJwt = response.data;
    const decodedUser = decodeJwt(userJwt);

    const faydaId = response.data

    let user = await Users.findOne({faydaId})

    if (!user){
      user = new Users({
        faydaId,
        fullName: decodedUser.name,
        email: decodedUser.email || null,
        phone: decodedUser.phone_number || null,
      })
      await user.save()
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        faydaId: user.faydaId,
        name: user.name,
        role: user.role || "patient",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

      return res.json({
        message: user ? "User logged in successfully" : "User registered successfully",
        token: jwtToken,
        user,
    });


  } catch (error: any) {
    console.error("User info fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
