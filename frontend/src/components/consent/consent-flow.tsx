import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Smartphone, 
  Fingerprint, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  User,
  Building2
} from "lucide-react";

interface ConsentFlowProps {
  requestData: {
    doctorName: string;
    hospital: string;
    purpose: string;
    requestedData: string[];
    urgency: "routine" | "urgent" | "emergency";
  };
  onApprove: () => void;
  onDeny: () => void;
}

export function ConsentFlow({ requestData, onApprove, onDeny }: ConsentFlowProps) {
  const [step, setStep] = useState<"review" | "verify" | "biometric">("review");
  const [otpCode, setOtpCode] = useState("");
  const [biometricVerified, setBiometricVerified] = useState(false);

  const handleOtpVerification = () => {
    if (otpCode === "123456") {
      setStep("biometric");
    }
  };

  const handleBiometricVerification = () => {
    setBiometricVerified(true);
    setTimeout(() => {
      onApprove();
    }, 1000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency": return "bg-medical-error";
      case "urgent": return "bg-medical-warning";
      case "routine": return "bg-medical-primary";
      default: return "bg-muted";
    }
  };

  const renderReviewStep = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-medical-primary">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-medical-primary" />
            Medical Record Access Request
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getUrgencyColor(requestData.urgency)}>
              {requestData.urgency.toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">Priority Level</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-medical-primary" />
                <div>
                  <p className="font-medium">Requesting Doctor</p>
                  <p className="text-sm text-muted-foreground">{requestData.doctorName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-medical-primary" />
                <div>
                  <p className="font-medium">Healthcare Facility</p>
                  <p className="text-sm text-muted-foreground">{requestData.hospital}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Purpose of Access</p>
              <p className="text-sm text-muted-foreground">{requestData.purpose}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="font-medium mb-3">Requested Medical Data</p>
            <div className="grid grid-cols-2 gap-2">
              {requestData.requestedData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-accent/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-medical-secondary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Privacy Notice</p>
                <p className="text-sm text-blue-700 mt-1">
                  Your consent allows this healthcare provider to access only the specified medical records for the stated purpose. 
                  Access will be logged and you can revoke consent at any time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button 
          onClick={() => setStep("verify")} 
          className="flex-1 bg-medical-secondary hover:bg-medical-secondary/90"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Grant Access
        </Button>
        <Button 
          variant="outline" 
          onClick={onDeny}
          className="flex-1 text-medical-error border-medical-error hover:bg-medical-error/10"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Deny Request
        </Button>
      </div>
    </div>
  );

  const renderVerifyStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-medical-primary rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <CardTitle>SMS Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your registered mobile number
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Code sent to: +251 91X XXX XX67
            </p>
            <div className="space-y-3">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleOtpVerification}
              disabled={otpCode.length !== 6}
              className="flex-1 bg-medical-primary hover:bg-medical-primary/90"
            >
              Verify Code
            </Button>
            <Button variant="outline" onClick={() => setStep("review")}>
              Back
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive code? <Button variant="link" className="p-0 h-auto">Resend</Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderBiometricStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            biometricVerified ? 'bg-medical-secondary' : 'bg-medical-accent'
          }`}>
            {biometricVerified ? (
              <CheckCircle2 className="w-8 h-8 text-white" />
            ) : (
              <Fingerprint className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle>
            {biometricVerified ? "Verification Complete" : "Biometric Verification"}
          </CardTitle>
          <CardDescription>
            {biometricVerified 
              ? "Access has been granted successfully"
              : "Place your finger on the sensor to complete verification"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!biometricVerified ? (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="w-24 h-24 mx-auto bg-medical-accent/20 rounded-full flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-medical-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Touch and hold the fingerprint sensor
              </p>
              <Button 
                onClick={handleBiometricVerification}
                className="bg-medical-accent hover:bg-medical-accent/90"
              >
                Simulate Biometric Scan
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-medical-secondary">
                <CheckCircle2 className="w-16 h-16 mx-auto" />
              </div>
              <p className="font-medium text-medical-secondary">
                Consent granted successfully!
              </p>
              <p className="text-sm text-muted-foreground">
                The healthcare provider now has access to your requested medical records.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step === "review" ? 1 : step === "verify" ? 2 : 3} of 3</span>
            <span className="text-sm text-muted-foreground">Consent Verification Process</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-medical-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: step === "review" ? "33%" : step === "verify" ? "66%" : "100%" 
              }}
            />
          </div>
        </div>

        {step === "review" && renderReviewStep()}
        {step === "verify" && renderVerifyStep()}
        {step === "biometric" && renderBiometricStep()}
      </div>
    </div>
  );
}