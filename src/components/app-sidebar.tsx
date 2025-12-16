"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  FlaskConical,
  Target,
  GraduationCap,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "~/components/ui/sidebar";

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

// Map section IDs to route paths
function getRoutePath(sectionId: string): string {
  const routeMap: Record<string, string> = {
    main: "/",
    "data-extraction": "/data-extraction",
    households: "/households",
    inspections: "/inspections",
    "usage-surveys": "/usage-surveys",
    staff: "/staff",
    "local-authorities": "/local-authorities",
    "cv-performance": "/cv-performance",
    "coordinator-reports": "/coordinator-reports",
    "not-active": "/not-active",
    archived: "/archived",
    "kpt-surveys": "/kpt-surveys",
    "sdg-surveys": "/sdg-surveys",
    training: "/training",
    system: "/system",
  };
  return routeMap[sectionId] ?? "/";
}

export function AppSidebar() {
  const pathname = usePathname();

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

  return (
    <Sidebar className="static flex">
      <SidebarHeader />
      <SidebarContent>
        {navigationGroups.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const routePath = getRoutePath(item.id);
                  const isActive = pathname === routePath;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      {item.future ? (
                        <SidebarMenuButton
                          isActive={false}
                          disabled={true}
                          tooltip={item.label}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">
                            Soon
                          </span>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                        >
                          <Link href={routePath}>
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            {item.badge && (
                              <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
