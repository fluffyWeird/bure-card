import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Phone,
  MapPin,
  Venus,
  BookText,
} from "lucide-react";
import { useState } from "react";
import { PatientRecords } from "../medical/patient-records";

type Patient = {
  name: string
  age: string
  onPressed: () => void;
}
export function PatientDashboard() {
  const [showFullRecords, setShowFullRecords] = useState<boolean>(false);
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
  ];
  const sampleUser = [
    {
      name: "Jhonny Doey",
      age: "32",
      gender: "Male",
      religion: "Christian",
      phone: "+251911111",
      address: "St.Rufael",
    },
  ];
  const recentActivity = [
    {
      id: 1,
      action: "Lab results uploaded",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      action: "Consent granted to Dr. Alemayehu",
      time: "1 day ago",
      icon: CheckCircle2,
    },
    {
      id: 3,
      action: "Prescription updated",
      time: "3 days ago",
      icon: Activity,
    },
  ];


  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Patient Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your health records and consent
          </p>
        </div>
        <Button onClick={
          () => {
            setShowFullRecords(true);
          }
        } variant={"default"}>View Full</Button>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Access Requests */}
{
  showFullRecords && (
    <PatientRecords patientId="992" patientName="nashit" onPressed={
      () => {
        setShowFullRecords(false);
      }
    } />
  )
}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-6 h-5 mr-2 text-status-pending" />
              User
            </CardTitle>
            <CardDescription>Patient description</CardDescription>
          </CardHeader>
          ;
          <CardContent>
            <div className="space-y-4">
              {sampleUser.map((user) => (
                <div
                  key={user.name}
                  className="p-4 border border-border rounded-xl shadow-sm"
                >
                  <div className="flex flex-wrap gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col flex-1 min-w-[250px]">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <label className="text-sm font-medium">Full Name</label>
                      </div>
                      <input
                        disabled
                        value={user.name}
                        className="bg-muted/30 rounded-md p-2 text-sm"
                      />
                    </div>

                    {/* Group: Age + Gender */}
                    <div className="flex flex-1 gap-4 min-w-[250px]">
                      {/* Age */}
                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <label className="text-sm font-medium">Age</label>
                        </div>
                        <input
                          disabled
                          value={user.age}
                          className="bg-muted/30 rounded-md p-2 text-sm"
                        />
                      </div>

                      {/* Gender */}
                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-2 mb-1">
                          <Venus className="w-4 h-4 text-muted-foreground" />
                          <label className="text-sm font-medium">Gender</label>
                        </div>
                        <input
                          disabled
                          value={user.gender}
                          className="bg-muted/30 rounded-md p-2 text-sm"
                        />
                      </div>
                    </div>

                    {/* Religion */}
                    <div className="flex flex-col flex-1 min-w-[250px]">
                      <div className="flex items-center space-x-2 mb-1">
                        <BookText className="w-4 h-4 text-muted-foreground" />
                        <label className="text-sm font-medium">Religion</label>
                      </div>
                      <input
                        disabled
                        value={user.religion}
                        className="bg-muted/30 rounded-md p-2 text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col flex-1 min-w-[250px]">
                      <div className="flex items-center space-x-2 mb-1">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <label className="text-sm font-medium">Phone</label>
                      </div>
                      <input
                        disabled
                        value={user.phone}
                        className="bg-muted/30 rounded-md p-2 text-sm"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col flex-1 min-w-[250px]">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <label className="text-sm font-medium">Address</label>
                      </div>
                      <input
                        disabled
                        value={user.address}
                        className="bg-muted/30 rounded-md p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-6 h-5 mr-2 text-status-pending" />
              Medical History Timeline
            </CardTitle>
            <CardDescription>Most recent medical history</CardDescription>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-2 font-medium">Date</th>
                  <th className="p-2 font-medium">Hospital</th>
                  <th className="p-2 font-medium">Doctor</th>
                  <th className="p-2 font-medium">Purpose</th>
                  <th className="p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {accessRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-t border-border hover:bg-muted/30 transition"
                  >
                    <td className="p-2">
                      {new Date(request.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-2">{request.hospital}</td>
                    <td className="p-2">{request.doctor}</td>
                    <td className="p-2">{request.purpose}</td>
                    <td className="p-2">
                      <Badge className="text-xs bg-orange-400">
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-medical-accent" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your recent health record activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 hover:bg-accent/50 rounded-lg transition-colors"
              >
                <activity.icon className="w-5 h-5 text-medical-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
