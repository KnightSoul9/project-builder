import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { EditorLayout } from "@/components/editor/editor-layout";

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <EditorLayout>
      <section
        aria-label="Editor canvas"
        className="flex flex-1 items-center justify-center"
      >
        <p className="text-sm text-copy-muted">Editor canvas</p>
      </section>
    </EditorLayout>
  );
}
