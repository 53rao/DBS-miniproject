import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const collection = await prisma.collection.findUnique({
    where: { id: 1 },
    include: {
      movies: {
        select: {
          id: true,
          title: true,
          banner_url: true,
          trailer_url: true,
          synopsis:true,
          runtime:true,
        }
      }
    }
  })

  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 })
  }

  return NextResponse.json({ data: collection }, { status: 200 })
}