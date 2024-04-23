import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function GET(request: Request) {
  const posts = await prisma.post.findMany({
    // select: {
    //   user: true,
    //   postDescription: true, // Assuming postDescription corresponds to the title field in your schema
    // },
    include: {
      user: true,
    },
  });

  return NextResponse.json(posts);
}
