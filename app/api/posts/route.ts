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

    return NextResponse.json({ response: "ok", post: post}, { status: 200} )
  } catch(error) {
    return NextResponse.json({ response: "error", message: "保存に失敗しました"}, { status: 500 });
  }
}

export const GET = async () => {
  try {
    const allPosts = await prisma.post.findMany();
    return NextResponse.json({ response: "ok", posts: allPosts}, { status: 200} )
  } catch (error) {
    return NextResponse.json({ status: "error", message: "データ取得に失敗しました"}, { status: 500 });
  }
}