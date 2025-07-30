
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { IdCard, QrCode } from 'lucide-react';
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
const Login = () => {
 


const generateSignInUrl = () => {
  const params: AuthParams = {
    client_id: import.meta.env.VITE_CLIENT_ID || '',
    redirect_uri: import.meta.env.VITE_REDIRECT_URI || '',
  response_type: "code",
      scope: "openid profile email",
      acr_values: "mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics",
      claims: '{"userinfo":{"name":{"essential":true},"phone":{"essential":true},"email":{"essential":true},"picture":{"essential":true},"gender":{"essential":true},"birthdate":{"essential":true},"address":{"essential":true}},"id_token":{}}',
      code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
      code_challenge_method: "S256",
      display: "page",
      nonce: "g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g",
      state: "ptOO76SD",
      ui_locales: "en",
  };

  const searchParams = new URLSearchParams(params as Record<string, string>);

  return `${import.meta.env.VITE_AUTHORIZATION_ENDPOINT}?${searchParams.toString()}`;
};
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-medium">
        <CardContent className="p-8 space-y-6">
        
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Bure-Card Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Access your health records securely
            </p>
          </div>

          
          <div className="space-y-4">
           
            <Button 
           onClick={() => {
            console.log("Redirecting to OIDC login...");
            console.log("Generated SignIn URL:", generateSignInUrl());
            window.location.href = generateSignInUrl();
             
           }}
              className="w-full h-12 gap-2 bg-foreground hover:bg-foreground/90 text-background"
              size="lg"
            >
              <IdCard className="w-4 h-4" />
              Login via Fayda OIDC
            </Button>

         
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;