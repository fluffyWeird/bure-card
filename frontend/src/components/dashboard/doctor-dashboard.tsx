import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Search, Users, FileText, Clock, CheckCircle2, XCircle, User } from "lucide-react";

export function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const patientRequests = [
    {
      id: 1,
      patientName: "Almaz Tesfaye",
      faydaId: "FID001234",
      requestDate: "2024-01-15",
      status: "pending",
      purpose: "Routine Checkup"
    },
    {
      id: 2,
      patientName: "Dawit Kebede",
      faydaId: "FID005678",
      requestDate: "2024-01-14",
      status: "approved",
      purpose: "Follow-up Consultation"
    }
  ];

  const myPatients = [
    {
      id: 1,
      name: "Sara Ahmed",
      faydaId: "FID009876",
      lastVisit: "2024-01-10",
      condition: "Hypertension",
      status: "stable"
    },
    {
      id: 2,
      name: "Bekele Molla",
      faydaId: "FID005432",
      lastVisit: "2024-01-08",
      condition: "Diabetes Type 2",
      status: "monitoring"
    }
  ];

 

  const handleSearch = () => {
    // Implement patient search functionality
    console.log("Searching for:", searchQuery);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-status-pending";
      case "approved": return "bg-status-approved";
      case "stable": return "bg-status-approved";
      case "monitoring": return "bg-status-processing";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage patient records and appointments</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       


        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <FileText className="h-4 w-4 text-status-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records Accessed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-status-approved" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-medical-primary" />
            Patient Search
          </CardTitle>
          <CardDescription>
            Search for patients using Fayda ID or name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Fayda ID or patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-medical-primary hover:bg-medical-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
      

        {/* Patient Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-status-pending" />
              Recent Requests
            </CardTitle>
            <CardDescription>
              Patient record access requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {patientRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{request.patientName}</p>
                  <p className="text-sm text-muted-foreground">ID: {request.faydaId}</p>
                  <p className="text-xs text-muted-foreground">{request.purpose}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  {request.status === "approved" && (
                    <Button size="sm" variant="outline">
                      View Records
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}