import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  FileText, 
  Activity, 
  CheckCircle2, 
  User, 
  Phone, 
  MapPin, 
  Venus, 
  BookText,
 
  ClipboardList,
 
} from "lucide-react";
import { PatientRecords } from "../medical/patient-records";
import { useAuth } from "@/lib/AuthContext";

export function PatientDashboard() {
  const [showFullRecords, setShowFullRecords] = useState(false);
  const { user } = useAuth();

  const accessRequests = [
    {
      id: 1,
      hospital: "Addis Ababa Medical Center",
      doctor: "Dr. Alemayehu Tadesse",
      purpose: "Routine Checkup",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: 2,
      hospital: "Black Lion Hospital",
      doctor: "Dr. Hanna Bekele",
      purpose: "Cardiology Consultation",
      status: "approved",
      date: "2024-01-14",
    },
    {
      id: 3,
      hospital: "St. Paul's Hospital",
      doctor: "Dr. Samuel Getachew",
      purpose: "Diabetes Follow-up",
      status: "approved",
      date: "2024-01-10",
    },
    {
      id: 4,
      hospital: "Tikur Anbessa Hospital",
      doctor: "Dr. Marta Assefa",
      purpose: "Lab Results Review",
      status: "pending",
      date: "2024-01-05",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Lab results uploaded",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      id: 2,
      action: "Consent granted to Dr. Alemayehu",
      time: "1 day ago",
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      id: 3,
      action: "Prescription updated",
      time: "3 days ago",
      icon: Activity,
      color: "text-purple-500"
    },
    {
      id: 4,
      action: "Appointment scheduled",
      time: "4 days ago",
      icon: Calendar,
      color: "text-amber-500"
    },
  ];




  return (
    <div className="min-h-screen bg-slate-50 p-6">
     
      {showFullRecords && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <PatientRecords 
              patientId="992" 
              patientName="Alemayehu" 
              onPressed={() => setShowFullRecords(false)} 
            />
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
      
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <User className="w-8 h-8 text-blue-600" />
              Patient Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your health records and consent
            </p>
          </div>
          
            <div className="flex gap-3 items-center">
            <Button 
              onClick={() => setShowFullRecords(true)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              View Full Records
            </Button>
            <span className="text-slate-500 text-sm px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
              View only
            </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
          <div className="lg:col-span-1">
            <Card className="border-blue-100 bg-white">
              <CardHeader className="bg-blue-50 rounded-t-lg border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-blue-800">Patient Profile</CardTitle>
                </div>
                <CardDescription className="text-blue-600">
                  Personal information and details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-4" >
                    <img 
                      src={user?.picture || "/default-avatar.png"} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
                  <p className="text-slate-600 text-sm">Patient ID: ETH-123456789</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Age</span>
                      </div>
                      <p className="font-medium">{ "N/A"} years</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1 text-slate-600">
                        <Venus className="w-4 h-4" />
                        <span className="text-sm font-medium">Gender</span>
                      </div>
                      <p className="font-medium">{user?.gender}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1 text-slate-600">
                      <BookText className="w-4 h-4" />
                      <span className="text-sm font-medium">Religion</span>
                    </div>
                    <p className="font-medium">{"N/A"}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="font-medium">{user?.faydaId}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="font-medium">{user?.address?.zone}, {user?.address?.woreda}, {user?.address?.region}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          
          <div className="lg:col-span-2 space-y-6">
           
            
           
            <Card className="border-slate-100">
              <CardHeader className="bg-white border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                  <CardTitle>Medical History Timeline</CardTitle>
                </div>
                <CardDescription>Recent medical access requests</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Hospital</th>
                        <th className="p-3 text-left font-medium">Doctor</th>
                        <th className="p-3 text-left font-medium">Purpose</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessRequests.map((request) => (
                        <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3">
                            {new Date(request.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="p-3 font-medium">{request.hospital}</td>
                          <td className="p-3">{request.doctor}</td>
                          <td className="p-3">{request.purpose}</td>
                          <td className="p-3">
                            <Badge 
                              className={`text-xs ${request.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'}`}
                            >
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
       
            <Card className="border-slate-100">
              <CardHeader className="bg-white border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <CardTitle>Recent Activity</CardTitle>
                </div>
                <CardDescription>Your recent health record activities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-start hover:bg-slate-50">
                      <div className={`p-2 rounded-lg ${activity.color} mr-4 mt-1`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}