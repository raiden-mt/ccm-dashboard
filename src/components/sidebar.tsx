"use client";

import type React from "react";

import { cn } from "~/lib/utils";
import {
  LayoutDashboard,
  Home,
  ClipboardCheck,
  FileBarChart,
  Users,
  Building2,
  TrendingUp,
  FileText,
  UserX,
  Archive,
  Database,
  FlaskConical,
  Target,
  GraduationCap,
  Settings,
} from "lucide-react";

type NavigationItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  disabled?: boolean;
  future?: boolean;
};

type NavigationGroup = {
  title?: string;
  items: NavigationItem[];
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isFullAccess: boolean;
}

export function DashboardSidebar({
  activeSection,
  onSectionChange,
  isFullAccess,
}: SidebarProps) {
  const navigationGroups: NavigationGroup[] = [
    {
      items: [
        { id: "main", label: "Main", icon: LayoutDashboard },
        { id: "households", label: "Households", icon: Home },
        { id: "inspections", label: "Inspections", icon: ClipboardCheck },
        { id: "usage-surveys", label: "Usage Survey", icon: FileBarChart },
        { id: "staff", label: "Staff", icon: Users },
        {
          id: "local-authorities",
          label: "Local Authorities",
          icon: Building2,
        },
        { id: "cv-performance", label: "CV Performance", icon: TrendingUp },
        {
          id: "coordinator-reports",
          label: "Coordinator Monthly Reports",
          icon: FileText,
        },
        { id: "not-active", label: "Not Active", icon: UserX },
        { id: "archived", label: "Archived", icon: Archive },
      ],
    },
    {
      title: "Future Development",
      items: [
        {
          id: "kpt-surveys",
          label: "Kitchen Performance Test",
          icon: FlaskConical,
          future: true,
        },
        { id: "sdg-surveys", label: "SDG Survey", icon: Target, future: true },
        {
          id: "training",
          label: "Training",
          icon: GraduationCap,
          future: true,
        },
        { id: "system", label: "System", icon: Settings, future: true },
      ],
    },
  ];

  // Add data extraction for full access users
  if (isFullAccess) {
    navigationGroups[0]?.items.splice(1, 0, {
      id: "data-extraction",
      label: "Data Extraction",
      icon: Database,
    });
  }

  return (
    <aside className="border-border bg-card-cream w-64 border-r">
      <nav className="flex flex-col gap-1 p-4">
        {navigationGroups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className={groupIdx > 0 ? "border-border mt-4 border-t pt-4" : ""}
          >
            {group.title && (
              <p className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.future && onSectionChange(item.id)}
                disabled={item.future}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : item.future
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-foreground/70 hover:bg-action-beige hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-status-salmon text-foreground rounded-full px-2 py-0.5 text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
                {item.future && (
                  <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
