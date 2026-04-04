import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest,{params}: { params: Promise<{ id: string }> }){
    const { id } = await params;
    const requiredid = Number(id);
    const movie=await prisma.movie.findUnique({
        where:{
            id:requiredid,
        },
        select:{
            title: true,
            synopsis: true,
            runtime: true,
            release_date: true,
            release_type: true,
            classification: true,
            collection_name: true,
            age_rating: true,
            trailer_url: true,
            banner_url: true,
            poster_url: true,
            ott_url: true,
            ott_platform: true,
            country: true,
            created_at: true
        }
    })
    if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 })
  }
    return NextResponse.json(
        {data:movie},{status:200}
    )
}