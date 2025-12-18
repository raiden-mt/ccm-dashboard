"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type SidebarHeaderTriggerProps = {
  className?: string;
};

export function SidebarHeaderTrigger({ className }: SidebarHeaderTriggerProps) {
  const handleClick = React.useCallback(() => {
    window.dispatchEvent(new Event("sidebar-toggle"));
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10",
        className,
      )}
      onClick={handleClick}
      data-sidebar="header-trigger"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

