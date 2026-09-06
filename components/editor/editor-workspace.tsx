"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useProjectActions,
  type ProjectItem,
} from "@/hooks/use-project-actions";

import { EditorLayout } from "./editor-layout";
import { ProjectDialogs } from "./project-dialogs";

interface EditorWorkspaceProps {
  projects: ProjectItem[];
}

export function EditorWorkspace({ projects }: EditorWorkspaceProps) {
  const {
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
  } = useProjectActions();

  return (
    <>
      <EditorLayout
        projectItems={projects}
        onCreateProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      >
        <section
          aria-label="Editor home"
          className="flex flex-1 items-center justify-center px-6 py-10"
        >
          <div className="flex max-w-xl flex-col items-center text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-copy-primary">
              Create a project or open an existing one
            </h1>
            <p className="mt-4 text-base text-copy-muted">
              Start a new architecture workspace, or choose a project from the
              sidebar.
            </p>
            <Button className="mt-8" onClick={openCreateDialog} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </section>
      </EditorLayout>

      <ProjectDialogs
        dialog={dialog}
        formName={formName}
        formSlug={formSlug}
        loading={loading}
        error={error}
        onClose={closeDialog}
        onChangeName={setFormName}
        onCreate={createProject}
        onRename={renameProject}
        onDelete={deleteProject}
      />
    </>
  );
}
