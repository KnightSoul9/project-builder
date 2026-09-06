import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  isOwner: boolean;
}

export async function getProjectsForUser(
  userId: string,
): Promise<ProjectSummary[]> {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        ...(email
          ? [{ collaborators: { some: { collaboratorEmail: email } } }]
          : []),
      ],
    },
    orderBy: { updatedAt: "desc" },
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    slug: project.id,
    isOwner: project.ownerId === userId,
  }));
}
