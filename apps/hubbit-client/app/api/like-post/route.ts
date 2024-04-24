import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, postId } = body;

  console.log(body);

  //   const post = await prisma.post.findUnique({
  //     where: { id:  postId},
  //   });

  //   if (!post) {
  //     throw new Error("User not found");
  //   }

  //   post.postDescription = postDescription;

  //   const updatedPost = await prisma.post.update({
  //     where: { id: postId },
  //     data: post,
  //   });

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  console.log(post);

  if (post && post.likes.includes(userId)) {
    // Update the post to remove the string from the likes array
    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          set: post.likes.filter((like) => like !== userId),
        },
      },
    });
  } else {
    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          push: userId,
        },
      },
    });
  }
  console.log("I'm in Fever.");

  return NextResponse.json(post.likes.length);
}
