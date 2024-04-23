import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { postId } = body;

  console.log(body);

  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
}
