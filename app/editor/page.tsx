import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { EditorWorkspace } from "@/components/editor/editor-workspace";

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <EditorWorkspace />;
}
