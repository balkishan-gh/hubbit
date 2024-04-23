import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { postDescription, postId } = body;

  console.log(body);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("User not found");
  }

  post.postDescription = postDescription;

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: post,
  });

  return NextResponse.json(updatedPost);
}
