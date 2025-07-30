import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  FileText, 
  Shield, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Eye
} from "lucide-react";

export function AdminDashboard() {
  const systemStats = {
    totalHospitals: 45,
    totalUsers: 12489,
    dailyAccess: 1234,
    pendingRegistrations: 7
  };

  const recentActivity = [
    {
      id: 1,
      action: "Hospital Registration",
      entity: "Yeka Health Center",
      timestamp: "2 hours ago",
      type: "registration"
    },
    {
      id: 2,
      action: "Bulk Patient Access",
      entity: "Dr. Alemayehu Tadesse",
      timestamp: "4 hours ago",
      type: "access"
    },
    {
      id: 3,
      action: "System Audit",
      entity: "Security Team",
      timestamp: "6 hours ago",
      type: "audit"
    }
  ];

  const pendingHospitals = [
    {
      id: 1,
      name: "Adama Medical College",
      type: "Teaching Hospital",
      location: "Adama, Ethiopia",
      submittedDate: "2024-01-10",
      status: "pending_review"
    },
    {
      id: 2,
      name: "Wolaita Sodo Hospital",
      type: "General Hospital",
      location: "Wolaita, Ethiopia", 
      submittedDate: "2024-01-12",
      status: "pending_documents"
    }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      user: "Dr. Hanna Bekele",
      action: "Accessed patient record",
      patient: "Almaz Tesfaye (FID001234)",
      hospital: "Black Lion Hospital",
      result: "success"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:25:10",
      user: "Dr. Alemayehu Tadesse",
      action: "Requested patient access",
      patient: "Dawit Kebede (FID005678)",
      hospital: "Addis Ababa Medical Center",
      result: "pending"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:20:15",
      user: "System",
      action: "Automatic consent expiry",
      patient: "Sara Ahmed (FID009876)",
      hospital: "Tikur Anbessa Hospital",
      result: "expired"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-status-approved";
      case "pending": return "bg-status-pending";
      case "expired": return "bg-status-rejected";
      case "pending_review": return "bg-status-processing";
      case "pending_documents": return "bg-status-pending";
      default: return "bg-muted";
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "registration": return Building2;
      case "access": return Users;
      case "audit": return Shield;
      default: return Activity;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <Button className="bg-medical-accent hover:bg-medical-accent/90">
          <Shield className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalHospitals}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-medical-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Access</CardTitle>
            <TrendingUp className="h-4 w-4 text-medical-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.dailyAccess.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Record requests today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-status-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.pendingRegistrations}</div>
            <p className="text-xs text-muted-foreground">Hospital registrations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hospitals">Hospital Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-medical-accent" />
                Recent System Activity
              </CardTitle>
              <CardDescription>
                Latest actions across the healthcare platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = getActionIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <IconComponent className="w-5 h-5 text-medical-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.entity}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-4">
          {/* Pending Hospital Registrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-medical-primary" />
                Pending Hospital Registrations
              </CardTitle>
              <CardDescription>
                Hospital applications awaiting review and approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingHospitals.map((hospital) => (
                <div key={hospital.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-sm text-muted-foreground">{hospital.type} • {hospital.location}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {hospital.submittedDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(hospital.status)}>
                      {hospital.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" className="bg-status-approved hover:bg-status-approved/90">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          {/* Audit Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-medical-accent" />
                Security Audit Logs
              </CardTitle>
              <CardDescription>
                Complete audit trail of all system access and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-lg text-sm hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{log.user}</span>
                        <span className="text-muted-foreground">{log.action}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Patient: {log.patient} • Hospital: {log.hospital}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      <Badge className={getStatusColor(log.result)} variant="outline">
                        {log.result}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}