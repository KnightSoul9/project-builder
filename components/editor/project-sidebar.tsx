"use client";

import { FolderOpen, PencilLine, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ProjectItem } from "./use-project-dialogs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projectItems: ProjectItem[];
  onCreateProject?: () => void;
  onRenameProject?: (project: ProjectItem) => void;
  onDeleteProject?: (project: ProjectItem) => void;
}

function EmptyProjectState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">No projects yet</p>
    </div>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projectItems,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const ownedProjects = projectItems.filter((project) => project.isOwner);
  const sharedProjects = projectItems.filter((project) => !project.isOwner);

  return (
    <aside
      aria-label="Project sidebar"
      className={`fixed inset-y-14 left-0 z-40 flex w-80 flex-col border-r border-surface-border bg-bg-surface shadow-2xl transition-transform duration-200 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
        <Button
          aria-label="Close project sidebar"
          onClick={onClose}
          size="icon-sm"
          variant="ghost"
        >
          <X />
        </Button>
      </div>

      <Tabs
        className="flex min-h-0 flex-1 px-3 pt-4"
        defaultValue="my-projects"
      >
        <TabsList className="w-full">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects" className="mt-4 space-y-2">
          {ownedProjects.length === 0 ? (
            <EmptyProjectState />
          ) : (
            ownedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl border border-surface-border bg-bg-base px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-copy-primary">
                    {project.name}
                  </p>
                  <p className="truncate text-xs text-copy-muted">
                    /{project.slug}
                  </p>
                </div>

                <div className="ml-2 flex items-center gap-1">
                  <Button
                    aria-label={`Rename ${project.name}`}
                    onClick={() => onRenameProject?.(project)}
                    size="icon-xs"
                    variant="ghost"
                    type="button"
                  >
                    <PencilLine className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    aria-label={`Delete ${project.name}`}
                    onClick={() => onDeleteProject?.(project)}
                    size="icon-xs"
                    variant="ghost"
                    type="button"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="shared" className="mt-4 space-y-2">
          {sharedProjects.length === 0 ? (
            <EmptyProjectState />
          ) : (
            sharedProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-surface-border bg-bg-base px-3 py-2.5"
              >
                <p className="truncate text-sm font-medium text-copy-primary">
                  {project.name}
                </p>
                <p className="truncate text-xs text-copy-muted">
                  /{project.slug}
                </p>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-3">
        <Button className="w-full" onClick={onCreateProject} type="button">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
