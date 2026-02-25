import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };




export async function checkdbConnection():Promise<boolean> {
    try{
        console.log(await prisma.$queryRaw`Select 1`);
        return true
    }catch(error){
        return false
    }
}