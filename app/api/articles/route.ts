import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){

    const article=await prisma.article.findMany({
        include: { movie: true }}
    )
    if (!article) {
    return NextResponse.json({ error: "Articles not found" }, { status: 404 })
  }
    return NextResponse.json(
        {data:article},{status:200}
    )
}