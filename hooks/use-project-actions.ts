"use client";

import { usePathname, useRouter } from "next/navigation";
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

function createSuffix() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();
  const [dialog, setDialog] = useState<ProjectDialogState>({
    kind: null,
    project: null,
  });
  const [formName, setFormName] = useState("");
  const [suffix, setSuffix] = useState(createSuffix);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSlug = useMemo(() => {
    const slug = slugifyProjectName(formName);
    return dialog.kind === "create" ? `${slug}-${suffix}` : slug;
  }, [dialog.kind, formName, suffix]);

  const openCreateDialog = () => {
    setDialog({ kind: "create", project: null });
    setFormName("");
    setSuffix(createSuffix());
    setError(null);
  };

  const openRenameDialog = (project: ProjectItem) => {
    setDialog({ kind: "rename", project });
    setFormName(project.name);
    setError(null);
  };

  const openDeleteDialog = (project: ProjectItem) => {
    setDialog({ kind: "delete", project });
    setError(null);
  };

  const closeDialog = () => {
    setDialog({ kind: null, project: null });
    setFormName("");
    setLoading(false);
    setError(null);
  };

  const request = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    const body = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(body.error ?? "Something went wrong");
    }

    return body;
  };

  const createProject = async () => {
    const name = formName.trim();

    if (!name || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body = (await request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roomId: formSlug }),
      })) as { project: { id: string } };

      closeDialog();
      router.push(`/editor/${body.project.id}`);
    } catch (requestError) {
      setLoading(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create project",
      );
    }
  };

  const renameProject = async () => {
    const project = dialog.project;
    const name = formName.trim();

    if (!project || !name || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await request(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      closeDialog();
      router.refresh();
    } catch (requestError) {
      setLoading(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to rename project",
      );
    }
  };

  const deleteProject = async () => {
    const project = dialog.project;

    if (!project || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await request(`/api/projects/${project.id}`, { method: "DELETE" });

      closeDialog();
      if (pathname === `/editor/${project.id}`) {
        router.replace("/editor");
      } else {
        router.refresh();
      }
    } catch (requestError) {
      setLoading(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to delete project",
      );
    }
  };

  return {
    dialog,
    formName,
    setFormName,
    formSlug,
    loading,
    error,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    createProject,
    renameProject,
    deleteProject,
  };
}
