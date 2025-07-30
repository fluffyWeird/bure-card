import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import OIDC_CONFIG from "@/config/oidc";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndUser = async (code: string) => {
      try {
        // Exchange code for access token
        const tokenRes = await axios.post(
          OIDC_CONFIG.TOKEN_ENDPOINT,
          { code }
        );
        const { access_token } = tokenRes.data;

        // Fetch user info
        const userInfoRes = await axios.post(
          OIDC_CONFIG.USERINFO_ENDPOINT,
          { access_token }
        );

        // Store user info and mark as authenticated
        localStorage.setItem('userInfo', JSON.stringify(userInfoRes.data));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('accessToken', access_token);

        // Redirect to home/dashboard
        navigate('/');
      } catch (err) {
        // Handle error (optional: show error UI)
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    if (code) fetchTokenAndUser(code);
    else navigate('/login');
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span>Authenticating...</span>
    </div>
  );
};

export default Callback;