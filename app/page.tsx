"use client";

import { EditorLayout } from "@/components/editor/editor-layout";

export default function Home() {
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
