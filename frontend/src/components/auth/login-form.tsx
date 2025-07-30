import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QrCode, CreditCard } from "lucide-react";
import { RoleBadge } from "@/components/ui/role-badge";

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
          
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Role Selection</Label>
            <RadioGroup 
              value={selectedRole} 
              onValueChange={setSelectedRole}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient" className="flex-1 cursor-pointer">
                  <RoleBadge role="patient" />
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="hospital_staff" id="hospital_staff" />
                <Label htmlFor="hospital_staff" className="flex-1 cursor-pointer">
                  <RoleBadge role="hospital_staff" />
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="flex-1 cursor-pointer">
                  <RoleBadge role="admin" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}