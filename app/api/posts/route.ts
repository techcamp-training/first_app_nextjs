import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest)=> {
  const { content } = await request.json();

  try {
    const post = await prisma.post.create({
      data: {
        content,
      },
    })

    return NextResponse.json({ response: "Ok", post: post}, { status: 200} )
  } catch(error) {
    return NextResponse.json({ response: "error", message: "保存に失敗しました"}, { status: 500 });
  }
}