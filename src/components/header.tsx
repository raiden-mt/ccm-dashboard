"use client";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";

type UserRole = "tom_sally" | "geoff_nikki";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function DashboardHeader({ currentRole, onRoleChange }: HeaderProps) {
  const roleLabels: Record<UserRole, string> = {
    tom_sally: "Tom / Sally (Full Access)",
    geoff_nikki: "Geoff / Nikki (Executive Dashboard)",
  };

  return (
    <header className="border-border bg-primary border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-ripple-green flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-lg font-bold text-white">CCM</span>
          </div>
          <div>
            <h1 className="text-primary-foreground text-xl font-semibold">
              Changu Changu Moto
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Community Conservation Malawi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground gap-2"
              >
                <User className="h-4 w-4" />
                {roleLabels[currentRole]}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRoleChange("tom_sally")}>
                Tom / Sally (Full Access)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRoleChange("geoff_nikki")}>
                Geoff / Nikki (Executive Dashboard)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
