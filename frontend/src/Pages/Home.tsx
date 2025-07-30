import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PatientDashboard } from "@/components/dashboard/patient-dashboard";
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { PatientRecords } from "@/components/medical/patient-records";
import { ConsentFlow } from "@/components/consent/consent-flow";
import HospitalDashboard from "@/components/dashboard/hospital-dashboard";

interface DashboardProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  onLogout: () => void;
}

export default function Home({ currentRole, onRoleChange, onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<"dashboard" | "records" | "consent">("dashboard");
  const [selectedPatient, setSelectedPatient] = useState<{id: string, name: string} | null>(null);
  const [consentRequest, setConsentRequest] = useState<any>(null);

  // Demo consent request data
  const demoConsentRequest = {
    doctorName: "Dr. Alemayehu Tadesse",
    hospital: "Addis Ababa Medical Center",
    purpose: "Routine Checkup and Health Assessment",
    requestedData: [
      "Medical History",
      "Current Medications",
      "Lab Results (Last 6 months)",
      "Vital Signs",
      "Allergies & Conditions",
      "Vaccination Records"
    ],
    urgency: "routine" as const
  };

  const handleViewRecords = (patientId: string, patientName: string) => {
    setSelectedPatient({ id: patientId, name: patientName });
    setActiveView("records");
  };

  const handleShowConsentFlow = () => {
    setConsentRequest(demoConsentRequest);
    setActiveView("consent");
  };

  const handleConsentApprove = () => {
    console.log("Consent approved");
    setActiveView("dashboard");
    setConsentRequest(null);
  };

  const handleConsentDeny = () => {
    console.log("Consent denied");
    setActiveView("dashboard");
    setConsentRequest(null);
  };

  const renderMainContent = () => {
    if (activeView === "records" && selectedPatient) {
      return (
        <PatientRecords 
          patientId={selectedPatient.id}
          patientName={selectedPatient.name}
        />
      );
    }

    if (activeView === "consent" && consentRequest) {
      return (
        <ConsentFlow
          requestData={consentRequest}
          onApprove={handleConsentApprove}
          onDeny={handleConsentDeny}
        />
      );
    }

    // Dashboard view
    switch (currentRole) {
      case "patient":
        return <PatientDashboard />;
      case "doctor":
        return <DoctorDashboard />;
      case "hospital_staff":
        return <HospitalDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  // Don't show header for consent flow (it's full-screen)
  if (activeView === "consent") {
    return renderMainContent();
  }

  return (
    <div className="min-h-screen bg-red-200">
      <Header 
        currentRole={currentRole}
        onRoleChange={onRoleChange}
        onLogout={onLogout}
      />
      
      <main className="pb-6">
        {renderMainContent()}
      </main>

      {/* Demo Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
        {currentRole === "patient" && (
          <button
            onClick={handleShowConsentFlow}
            className="bg-medical-warning hover:bg-medical-warning/90 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          >
            Demo: Consent Flow
          </button>
        )}
        
        {(currentRole === "doctor" || currentRole === "hospital_staff") && (
          <button
            onClick={() => handleViewRecords("FID001234", "Almaz Tesfaye")}
            className="bg-medical-primary hover:bg-medical-primary/90 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          >
            Demo: View Patient Records
          </button>
        )}
      </div>
    </div>
  );
}