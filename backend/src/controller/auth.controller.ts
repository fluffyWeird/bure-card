import { Request, Response } from "express";
import axios from "axios";
import jwt from 'jsonwebtoken'
import { decodeJwt, jwtDecrypt } from "jose";
import { getOIDCConfig } from "../utils/oidc";

import { Users } from "../models/user.model";

import { generateSignedJwt } from "../utils/jwtGenerator";
import { cookieOptions } from "../utils/CookieOptions";


export const exchangeCodeForToken = async (req: Request, res: Response) => {
  try {
    console.log("Exchanging code for token with body:", req.body);
    const { code } = req.body;
    const { TOKEN_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI , CLIENT_ASSERTION_TYPE} = getOIDCConfig();
console.log("Using OIDC Config:", { TOKEN_ENDPOINT, CLIENT_ID, REDIRECT_URI, CLIENT_ASSERTION_TYPE });
const jwt = await generateSignedJwt();  
const params= new URLSearchParams({

        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
     
        client_assertion_type: CLIENT_ASSERTION_TYPE ,
        client_assertion: jwt,
         code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
        
      }) 
const response = await axios.post(
      TOKEN_ENDPOINT,
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
console.log("Token exchange response:", response.data);
   res.json({ access_token: response.data.access_token });
  } catch (error: any) {
    console.error("Token exchange error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to exchange token" });
  }
};

    interface DecodedUser {
      sub: string;
    
      name?: string;
      picture?: string;
      gender?: string;
      address?: {
        zone?: string;
        woreda?: string;
        region?: string;
      };
      email?: string;
      phone_number?: string;
    }
export const fetchUserInfo = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    const { USERINFO_ENDPOINT } = getOIDCConfig();
console.log("Fetching user info with access token:", access_token);
console.log("Using OIDC Config:", { USERINFO_ENDPOINT });
    const response = await axios.get(USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userJwt = response.data;


    const decodedUser = decodeJwt(userJwt) as DecodedUser;
    console.log("Decoded user info:", decodedUser);

    const faydaId = decodedUser.phone_number ;

    let user = await Users.findOne({faydaId})

    if (!user){
      user = new Users({
        sub: decodedUser.sub,
        faydaId,
        name: decodedUser.name,
        picture: decodedUser.picture || null,
        gender: decodedUser.gender || null,
        address: {
          zone: decodedUser.address?.zone || null,
          woreda: decodedUser.address?.woreda || null,
          region: decodedUser.address?.region || null
        },
        email: decodedUser.email || null,
        phone: decodedUser.phone_number || null,
        role:  "patient",
      })
      await user.save()
    }

    const token = jwt.sign(
      {
        id: user._id,
        faydaId: user.faydaId,
       
        userName: decodedUser.name,

        userRole: "patient",
      },
      process.env.access_Token as string,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, cookieOptions);

      return res.json({
        message: user ? "User logged in successfully" : "User registered successfully",
       
        user,
    });


  } catch (error: any) {
    console.error("User info fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(accessToken, process.env.access_Token as string) as any;
    console.log("Decoded JWT:", decoded);
    const user = await Users.findOne({ _id: decoded.id }).select("-__v -createdAt -updatedAt");
    console.log("Fetched user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



