import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface ProjectRouteContext {
  params: Promise<{ projectId: string }>;
}

const getProject = async (projectId: string) =>
  prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

export async function PATCH(request: Request, context: ProjectRouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await context.params;
  const project = await getProject(projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name =
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  if (!name) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: 400 },
    );
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  });

  return NextResponse.json({ project: updatedProject });
}

export async function DELETE(_request: Request, context: ProjectRouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await context.params;
  const project = await getProject(projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.project.delete({ where: { id: projectId } });

  return NextResponse.json({ success: true });
}
