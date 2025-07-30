import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QrCode, CreditCard } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<string>("patient");

  const handleFaydaLogin = () => {
    onLogin(selectedRole);
  };

  const handleQRLogin = () => {
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-accent rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Bure-Card Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your health records securely
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Button 
            onClick={handleFaydaLogin}
            className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Login via Fayda OIDC
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>
          
          <Button 
            onClick={handleQRLogin}
            variant="outline" 
            className="w-full border-border hover:bg-accent font-medium py-3"
            size="lg"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scan QR Code (Patient)
          </Button>
          
          
        </CardContent>
      </Card>
    </div>
  );
}