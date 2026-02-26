import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    const movie=await prisma.movie.findMany({
        select:{
            title:true,
            runtime:true,
            synopsis:true,
            collection_name:true,
            banner_url:true,
            trailer_url:true,
            release_date:true,
        }
    })
    return NextResponse.json(
        {data:movie},{status:200}
    )
}