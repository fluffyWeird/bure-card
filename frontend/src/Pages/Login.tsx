
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { IdCard, QrCode } from 'lucide-react';
import OIDC_CONFIG from '../config/oidc';
import { CardHeader, CardTitle } from '@/components/ui/card';

type AuthParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  acr_values: string;
  claims: string;
  code_challenge: string;
  code_challenge_method: string;
  display: string;
  nonce: string;
  state: string;
  ui_locales: string;
};
const generateSignInUrl = () => {
  const params = new URLSearchParams({
    client_id: OIDC_CONFIG.CLIENT_ID,
    redirect_uri: OIDC_CONFIG.REDIRECT_URI,
    response_type: OIDC_CONFIG.RESPONSE_TYPE,
    scope: OIDC_CONFIG.SCOPE,
    acr_values: OIDC_CONFIG.ACR_VALUES,
    claims: OIDC_CONFIG.CLAIMS,
    code_challenge: OIDC_CONFIG.CODE_CHALLENGE,
    code_challenge_method: OIDC_CONFIG.CODE_CHALLENGE_METHOD,
    display: OIDC_CONFIG.DISPLAY,
    nonce: OIDC_CONFIG.NONCE,
    state: OIDC_CONFIG.STATE,
    ui_locales: OIDC_CONFIG.UI_LOCALES,
  });
  return `${OIDC_CONFIG.AUTHORIZATION_ENDPOINT}?${params.toString()}`;
};

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <Card className="w-full max-w-md shadow-large">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-accent rounded-full flex items-center justify-center">
          <IdCard className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Bure-Card Login
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={() => { window.location.href = generateSignInUrl(); }}
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3"
          size="lg"
        >
          <IdCard className="w-5 h-5 mr-2" />
          Login via Fayda OIDC
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default Login;