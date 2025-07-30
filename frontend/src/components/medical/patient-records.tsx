import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  Activity, 
  Pill, 
  FlaskConical, 
  Heart,
  Download,
  Clock,
  User,
  ClosedCaption
} from "lucide-react";

interface PatientRecordsProps {
  patientId: string;
  patientName: string;
  onPressed: () => void;
}

export function PatientRecords({ patientId, patientName,onPressed }: PatientRecordsProps) {
  const [activeTab, setActiveTab] = useState("timeline");

  const patientInfo = {
    name: patientName,
    faydaId: patientId,
    dateOfBirth: "1985-03-15",
    gender: "Female",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    emergencyContact: "Dawit Tesfaye (+251911234567)"
  };

  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-10",
      type: "consultation",
      doctor: "Dr. Hanna Bekele",
      hospital: "Black Lion Hospital",
      diagnosis: "Hypertension Follow-up",
      notes: "Blood pressure stable at 130/80. Continue current medication.",
      medications: ["Lisinopril 10mg daily"],
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-05",
      type: "lab",
      doctor: "Dr. Alemayehu Tadesse",
      hospital: "Addis Ababa Medical Center",
      diagnosis: "Routine Blood Work",
      notes: "Complete blood count and lipid panel within normal ranges.",
      results: ["Hemoglobin: 13.2 g/dL", "Cholesterol: 180 mg/dL"],
      status: "completed"
    },
    {
      id: 3,
      date: "2023-12-20",
      type: "emergency",
      doctor: "Dr. Tekle Mariam",
      hospital: "St. Paul's Hospital",
      diagnosis: "Chest Pain - Rule out MI",
      notes: "ECG normal, cardiac enzymes negative. Discharged with follow-up.",
      status: "completed"
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedDate: "2024-01-10",
      prescribedBy: "Dr. Hanna Bekele",
      status: "active",
      instructions: "Take with or without food. Monitor blood pressure regularly."
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedDate: "2023-11-15",
      prescribedBy: "Dr. Alemayehu Tadesse",
      status: "active",
      instructions: "Take with meals to reduce stomach upset."
    }
  ];

  const labResults = [
    {
      id: 1,
      testName: "Complete Blood Count",
      date: "2024-01-05",
      results: [
        { parameter: "Hemoglobin", value: "13.2", unit: "g/dL", normal: "12.0-15.0", status: "normal" },
        { parameter: "White Blood Cells", value: "7.5", unit: "×10³/μL", normal: "4.0-11.0", status: "normal" },
        { parameter: "Platelets", value: "280", unit: "×10³/μL", normal: "150-400", status: "normal" }
      ]
    },
    {
      id: 2,
      testName: "Lipid Panel",
      date: "2024-01-05",
      results: [
        { parameter: "Total Cholesterol", value: "180", unit: "mg/dL", normal: "<200", status: "normal" },
        { parameter: "LDL", value: "110", unit: "mg/dL", normal: "<100", status: "high" },
        { parameter: "HDL", value: "45", unit: "mg/dL", normal: ">40", status: "normal" }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation": return FileText;
      case "lab": return FlaskConical;
      case "emergency": return Heart;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-status-approved";
      case "completed": return "bg-status-processing";
      case "normal": return "bg-status-approved";
      case "high": return "bg-status-rejected";
      case "low": return "bg-status-pending";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container  fixed bg-zinc-400 h-screen overflow-scroll shadow-2xl shadow-zinc-700 rounded-3xl top-[100px] left-0 right-0 mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Medical Records</h1>
          <p className="text-muted-foreground">Complete medical history and documentation</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Records
        </Button>
        <Button onClick={
          onPressed

        } variant="outline">
         <ClosedCaption className="w-4 h-4 mr-2" />
          close 
        </Button>
      </div>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-medical-primary" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Personal Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {patientInfo.name}</p>
                <p><span className="text-muted-foreground">Fayda ID:</span> {patientInfo.faydaId}</p>
                <p><span className="text-muted-foreground">Date of Birth:</span> {patientInfo.dateOfBirth}</p>
                <p><span className="text-muted-foreground">Gender:</span> {patientInfo.gender}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Medical Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Blood Type:</span> {patientInfo.bloodType}</p>
                <p><span className="text-muted-foreground">Allergies:</span> {patientInfo.allergies.join(", ")}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Emergency Contact</h3>
              <div className="space-y-1 text-sm">
                <p>{patientInfo.emergencyContact}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-medical-primary" />
                Medical Timeline
              </CardTitle>
              <CardDescription>
                Chronological view of all medical events and consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {medicalHistory.map((event, index) => {
                const IconComponent = getTypeIcon(event.type);
                return (
                  <div key={event.id} className="relative">
                    {index !== medicalHistory.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                    )}
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{event.diagnosis}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {event.date} • {event.doctor} • {event.hospital}
                                </CardDescription>
                              </div>
                              <Badge className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm mb-3">{event.notes}</p>
                            {event.medications && (
                              <div className="mb-3">
                                <h4 className="font-medium text-sm mb-1">Medications:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {event.medications.map((med, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {med}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {event.results && (
                              <div>
                                <h4 className="font-medium text-sm mb-1">Results:</h4>
                                <div className="space-y-1">
                                  {event.results.map((result, idx) => (
                                    <p key={idx} className="text-xs text-muted-foreground">{result}</p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-medical-secondary" />
                Current Prescriptions
              </CardTitle>
              <CardDescription>
                Active medications and prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{prescription.medication}</h3>
                      <p className="text-muted-foreground">{prescription.dosage} - {prescription.frequency}</p>
                    </div>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <Separator className="mb-3" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p><span className="text-muted-foreground">Prescribed by:</span> {prescription.prescribedBy}</p>
                      <p><span className="text-muted-foreground">Date:</span> {prescription.prescribedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Instructions:</p>
                      <p>{prescription.instructions}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FlaskConical className="w-5 h-5 mr-2 text-medical-accent" />
                Laboratory Results
              </CardTitle>
              <CardDescription>
                Recent lab tests and diagnostic results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {labResults.map((lab) => (
                <Card key={lab.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{lab.testName}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {lab.date}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {lab.results.map((result, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{result.parameter}</p>
                          <p className="text-sm text-muted-foreground">Normal: {result.normal}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{result.value} {result.unit}</span>
                            <Badge className={getStatusColor(result.status)} variant="outline">
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-medical-error" />
                Vital Signs
              </CardTitle>
              <CardDescription>
                Recent vital sign measurements and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <h3 className="font-medium text-sm text-muted-foreground">Blood Pressure</h3>
                  <p className="text-2xl font-bold text-foreground">130/80</p>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="font-medium text-sm text-muted-foreground">Heart Rate</h3>
                  <p className="text-2xl font-bold text-foreground">72</p>
                  <p className="text-xs text-muted-foreground">bpm</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="font-medium text-sm text-muted-foreground">Temperature</h3>
                  <p className="text-2xl font-bold text-foreground">36.8</p>
                  <p className="text-xs text-muted-foreground">°C</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="font-medium text-sm text-muted-foreground">Oxygen Saturation</h3>
                  <p className="text-2xl font-bold text-foreground">98</p>
                  <p className="text-xs text-muted-foreground">%</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}