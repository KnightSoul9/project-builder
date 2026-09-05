"use client";

import { useMemo, useState } from "react";

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  isOwner: boolean;
}

export type ProjectDialogKind = "create" | "rename" | "delete" | null;

export interface ProjectDialogState {
  kind: ProjectDialogKind;
  project: ProjectItem | null;
}

export function slugifyProjectName(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "project"
  );
}

const defaultProjects: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Platform Architecture",
    slug: "platform-architecture",
    isOwner: true,
  },
  { id: "proj-2", name: "API Gateway", slug: "api-gateway", isOwner: true },
  {
    id: "proj-3",
    name: "Design Review",
    slug: "design-review",
    isOwner: false,
  },
  {
    id: "proj-4",
    name: "Infra Blueprint",
    slug: "infra-blueprint",
    isOwner: false,
  },
];

export function useProjectDialogs() {
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [dialog, setDialog] = useState<ProjectDialogState>({
    kind: null,
    project: null,
  });
  const [formName, setFormName] = useState("");
  const [loading, setLoading] = useState(false);

  const formSlug = useMemo(() => slugifyProjectName(formName), [formName]);

  const openCreateDialog = () => {
    setDialog({ kind: "create", project: null });
    setFormName("");
    setLoading(false);
  };

  const openRenameDialog = (project: ProjectItem) => {
    setDialog({ kind: "rename", project });
    setFormName(project.name);
    setLoading(false);
  };

  const openDeleteDialog = (project: ProjectItem) => {
    setDialog({ kind: "delete", project });
    setLoading(false);
  };

  const closeDialog = () => {
    setDialog({ kind: null, project: null });
    setFormName("");
    setLoading(false);
  };

  const handleCreateProject = () => {
    const trimmedName = formName.trim();

    if (!trimmedName) {
      return;
    }

    setLoading(true);

    const nextProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: trimmedName,
      slug: slugifyProjectName(trimmedName),
      isOwner: true,
    };

    setProjects((currentProjects) => [nextProject, ...currentProjects]);
    setLoading(false);
    closeDialog();
  };

  const handleRenameProject = () => {
    if (!dialog.project) {
      return;
    }

    const trimmedName = formName.trim();

    if (!trimmedName) {
      return;
    }

    setLoading(true);

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === dialog.project?.id
          ? {
              ...project,
              name: trimmedName,
              slug: slugifyProjectName(trimmedName),
            }
          : project,
      ),
    );
    setLoading(false);
    closeDialog();
  };

  const handleDeleteProject = () => {
    if (!dialog.project) {
      return;
    }

    setLoading(true);
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== dialog.project?.id),
    );
    setLoading(false);
    closeDialog();
  };

  return {
    projects,
    dialog,
    formName,
    setFormName,
    formSlug,
    loading,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
  };
}
