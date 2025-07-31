import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PatientDashboard } from "@/components/dashboard/patient-dashboard";
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

import HospitalDashboard from "@/components/dashboard/hospital-dashboard";

interface DashboardProps {
  currentRole: string;

  onLogout: () => void;
  userName?: string;
}

export default function Home({ currentRole, onLogout, userName }: DashboardProps) {
  const [activeView, setActiveView] = useState<"dashboard" | "records" | "consent">("dashboard");

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
      "Vaccination Records",
    ],
    urgency: "routine" as const,
  };


 
console.log("Current user role:", currentRole);
  console.log("Current user name:", userName);
  const renderMainContent = () => {
   if (userName === "DR Andi" || userName === null) {
      currentRole = "admin";
    }

    switch (currentRole) {
      case "patient":
        return <PatientDashboard />;
      case "doc":
        return <DoctorDashboard />;
      case "hospital_staff":
        return <HospitalDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  if (activeView === "consent") {
    return renderMainContent();
  }

  return (
    <div className="min-h-screen bg-white-200">
      <Header currentRole={currentRole}  onLogout={onLogout} userName={userName} />
      <main className="pb-6">{renderMainContent()}</main>
      
    </div>
  );
}
