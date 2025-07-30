import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Shield, Building2 } from "lucide-react";
import { RoleBadge } from "@/components/ui/role-badge";

interface HeaderProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  onLogout: () => void;
  userName?: string;
}

export function Header({ currentRole, onRoleChange, onLogout, userName = "Demo User" }: HeaderProps) {
  const [notifications] = useState([
    { id: 1, message: "New consent request from Addis Ababa Medical Center", type: "info" },
    { id: 2, message: "Lab results available for review", type: "success" },
    { id: 3, message: "Appointment reminder for tomorrow", type: "warning" }
  ]);

  const roles = [
    { value: "patient", label: "Patient", icon: User },
    { value: "doctor", label: "Doctor", icon: Shield },
    { value: "hospital_staff", label: "Hospital Staff", icon: Building2 },
    { value: "admin", label: "Admin", icon: Settings }
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-accent rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl text-foreground">bure card</span>
          </div>
          <RoleBadge role={currentRole as any} />
        </div>

        <div className="flex items-center space-x-4">
          {/* Role Switcher - Demo Only */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                Switch Role (Demo)
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {roles.map((role) => (
                <DropdownMenuItem
                  key={role.value}
                  onClick={() => onRoleChange(role.value)}
                  className="cursor-pointer"
                >
                  <role.icon className="w-4 h-4 mr-2" />
                  {role.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-medical-error">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start p-3">
                  <div className="text-sm font-medium">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}