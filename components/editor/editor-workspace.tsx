"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EditorLayout } from "./editor-layout";
import { useProjectDialogs } from "./use-project-dialogs";
import { ProjectDialogs } from "./project-dialogs";

export function EditorWorkspace() {
  const {
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
  } = useProjectDialogs();

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
        onClose={closeDialog}
        onChangeName={setFormName}
        onCreate={handleCreateProject}
        onRename={handleRenameProject}
        onDelete={handleDeleteProject}
      />
    </>
  );
}
