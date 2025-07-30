import { Request, Response } from "express";
import axios from "axios";
import { decodeJwt } from "jose";
import { getOIDCConfig } from "../utils/oidc";
import { generateSignedJwt } from "../utils/jwtGenerator";

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
    const decodedUser = decodeJwt(userJwt);

    return res.json({ data: userJwt, decoded: decodedUser });
  } catch (error: any) {
    console.error("User info fetch error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
