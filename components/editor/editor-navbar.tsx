"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <header className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-surface-border bg-bg-surface px-3">
      <div className="flex items-center justify-start">
        <Button
          aria-label={
            isSidebarOpen ? "Close project sidebar" : "Open project sidebar"
          }
          onClick={onToggleSidebar}
          size="icon"
          variant="ghost"
        >
          <SidebarIcon />
        </Button>
      </div>
      <div className="flex items-center justify-center" />
      <div className="flex items-center justify-end" />
    </header>
  );
}
