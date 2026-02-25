import { checkdbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(request:NextRequest){
    const isConnected=await checkdbConnection()
    if(!isConnected){
        return NextResponse.json({
            status:"error ",
            message:"DB Down"
        },{
            status:503
        })
    }
    return NextResponse.json({
            status:"ok",
            message:"DB Working"
        },{
            status:200
        })
}