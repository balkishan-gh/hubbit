import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { postDescription, userId } = body;

  console.log(body);

  const post = await prisma.post.create({
    data: {
      postDescription: postDescription,
      userId: userId,
    },
  });

  return NextResponse.json(post);
}
