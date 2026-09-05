"use client";

import { Loader2, PencilLine, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import type { ProjectItem } from "./use-project-dialogs";

interface ProjectDialogsProps {
  dialog: {
    kind: "create" | "rename" | "delete" | null;
    project: ProjectItem | null;
  };
  formName: string;
  formSlug: string;
  loading: boolean;
  onClose: () => void;
  onChangeName: (value: string) => void;
  onCreate: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export function ProjectDialogs({
  dialog,
  formName,
  formSlug,
  loading,
  onClose,
  onChangeName,
  onCreate,
  onRename,
  onDelete,
}: ProjectDialogsProps) {
  const isOpen = dialog.kind !== null;

  const currentProjectName = dialog.project?.name ?? "this project";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      {dialog.kind === "create" && (
        <DialogContent
          className="sm:max-w-md"
          aria-describedby="create-project-description"
        >
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription id="create-project-description">
              Start a new architecture workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-copy-primary"
                htmlFor="project-name"
              >
                Project name
              </label>
              <Input
                id="project-name"
                autoFocus
                value={formName}
                onChange={(event) => onChangeName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onCreate();
                  }
                }}
                placeholder="My architecture workspace"
              />
            </div>

            <div className="rounded-2xl border border-surface-border bg-bg-subtle px-3 py-2">
              <p className="text-xs uppercase tracking-[0.12em] text-copy-muted">
                Slug preview
              </p>
              <p className="mt-1 text-sm text-copy-primary">/{formSlug}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              onClick={onCreate}
              disabled={!formName.trim() || loading}
              type="button"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

      {dialog.kind === "rename" && dialog.project && (
        <DialogContent
          className="sm:max-w-md"
          aria-describedby="rename-project-description"
        >
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription id="rename-project-description">
              Current project: {currentProjectName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-copy-primary"
                htmlFor="rename-project-name"
              >
                Project name
              </label>
              <Input
                id="rename-project-name"
                autoFocus
                value={formName}
                onChange={(event) => onChangeName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onRename();
                  }
                }}
              />
            </div>

            <div className="rounded-2xl border border-surface-border bg-bg-subtle px-3 py-2">
              <p className="text-xs uppercase tracking-[0.12em] text-copy-muted">
                Slug preview
              </p>
              <p className="mt-1 text-sm text-copy-primary">/{formSlug}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              onClick={onRename}
              disabled={!formName.trim() || loading}
              type="button"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PencilLine className="mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

      {dialog.kind === "delete" && dialog.project && (
        <DialogContent
          className="sm:max-w-md"
          aria-describedby="delete-project-description"
        >
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription id="delete-project-description">
              This action cannot be undone. {currentProjectName} will be
              permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
