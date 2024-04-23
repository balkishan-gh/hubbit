import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const { user } = await getServerSession();
  const posts = await prisma.post.findMany({
    // select: {
    //   user: true,
    //   postDescription: true, // Assuming postDescription corresponds to the title field in your schema
    // },
    where: {
      userId: user.email,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(posts);
}
