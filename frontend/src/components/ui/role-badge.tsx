import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: "doctor" | "patient" | "admin" | "hospital_staff";
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleConfig = {
    doctor: {
      label: "Doctor",
      variant: "default" as const,
      className: "bg-orange-400 text-primary-foreground"
    },
    patient: {
      label: "Patient", 
      variant: "secondary" as const,
      className: "bg-medical-secondary text-primary-foreground"
    },
    admin: {
      label: "Admin",
      variant: "destructive" as const,
      className: "bg-medical-accent text-primary-foreground"
    },
    hospital_staff: {
      label: "Hospital Staff",
      variant: "outline" as const,
      className: "bg-medical-warning text-primary-foreground"
    }
  };

  const config = roleConfig[role];

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}