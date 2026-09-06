import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  const roomId =
    typeof body === "object" &&
    body !== null &&
    "roomId" in body &&
    typeof body.roomId === "string"
      ? body.roomId.trim()
      : "";

  if (!name || !roomId) {
    return NextResponse.json(
      { error: "Project name and room ID are required" },
      { status: 400 },
    );
  }

  const project = await prisma.project.create({
    data: {
      id: roomId,
      ownerId: userId,
      name,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
