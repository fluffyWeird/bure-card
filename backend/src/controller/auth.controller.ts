import { Request, Response } from "express";
import axios from "axios";
import { decodeJwt } from "jose";
import { getOIDCConfig } from "../utils/oidc";

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

    return res.json({ data: userJwt, decoded: decodedUser });
  } catch (error: any) {
    console.error("User info fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
