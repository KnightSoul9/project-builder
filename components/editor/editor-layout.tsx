"use client";

import { useState, type ReactNode } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

import type { ProjectItem } from "./use-project-dialogs";

interface EditorLayoutProps {
  children: ReactNode;
  projectItems: ProjectItem[];
  onCreateProject?: () => void;
  onRenameProject?: (project: ProjectItem) => void;
  onDeleteProject?: (project: ProjectItem) => void;
}

export function EditorLayout({
  children,
  projectItems,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: EditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />

      <div
        aria-hidden={!isSidebarOpen}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 md:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projectItems={projectItems}
        onCreateProject={onCreateProject}
        onRenameProject={onRenameProject}
        onDeleteProject={onDeleteProject}
      />
      <section className="relative flex min-h-0 flex-1 bg-bg-base">
        {children}
      </section>
    </main>
  );
}
