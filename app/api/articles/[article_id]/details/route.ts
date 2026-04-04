import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ article_id: string }> }  
) {
  const { article_id } = await params;  
  const requiredid = Number(article_id);

  if (isNaN(requiredid)) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  const article = await prisma.article.findUnique({
    where: { article_id: requiredid },
    include: { movie: true }
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ article }, { status: 200 });
}