import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { EditorWorkspace } from "@/components/editor/editor-workspace";
import { getProjectsForUser } from "@/lib/projects";

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const projects = await getProjectsForUser(userId);

  return <EditorWorkspace projects={projects} />;
}
