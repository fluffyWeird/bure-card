import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Activity, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export function PatientDashboard() {
  const accessRequests = [
    {
      id: 1,
      hospital: "Addis Ababa Medical Center",
      doctor: "Dr. Alemayehu Tadesse",
      purpose: "Routine Checkup",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: 2,
      hospital: "Black Lion Hospital",
      doctor: "Dr. Hanna Bekele",
      purpose: "Cardiology Consultation",
      status: "approved",
      date: "2024-01-14"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Lab results uploaded", time: "2 hours ago", icon: FileText },
    { id: 2, action: "Consent granted to Dr. Alemayehu", time: "1 day ago", icon: CheckCircle2 },
    { id: 3, action: "Prescription updated", time: "3 days ago", icon: Activity }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Hanna Bekele",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Alemayehu Tadesse",
      date: "2024-01-25",
      time: "2:00 PM",
      type: "Consultation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-status-pending";
      case "approved": return "bg-status-approved";
      case "rejected": return "bg-status-rejected";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground">Manage your health records and consent</p>
        </div>
            <Button variant={"default"}>
        view My History
      </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grants</CardTitle>
            <AlertCircle className="h-4 w-4 text-status-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Access consent needed</p>
          </CardContent>
        </Card>

      

  
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-status-pending" />
              Recent Requests Activity
            </CardTitle>
            <CardDescription>
              Healthcare providers requested access to your records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {accessRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{request.hospital}</p>
                  <p className="text-sm text-muted-foreground">{request.doctor}</p>
                  <p className="text-xs text-muted-foreground">{request.purpose}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs   bg-orange-400 `}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>

                  <p className="text-xs text-muted-foreground">
                    {new Date(request.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                 
                </div>
              </div>
            ))}
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
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-accent/50 rounded-lg transition-colors">
                <activity.icon className="w-5 h-5 text-medical-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}