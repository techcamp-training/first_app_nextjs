import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } =  await params;
  const postId = parseInt(id, 10);
  const { content } = await request.json();

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        content,
      },
    })

    return NextResponse.json({ response: "ok", post: updatedPost }, { status: 200} );
  } catch(error) {
    return NextResponse.json({ response: "error", message: "更新に失敗しました"}, { status: 500});
  }
}

export const DELETE = async (request: NextRequest, { params}: { params: { id: string }}) => {
  const { id } = await params;
  const postId = parseInt(id, 10);

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId
      },
    })

    return NextResponse.json({ response: "ok", post: deletedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ response: "error", message: "削除に失敗しました"}, { status: 500 })
  }
}