import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    const movie=await prisma.movie.findMany()
    return NextResponse.json(
        {data:movie},{status:200}
    )
}