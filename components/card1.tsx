import { NextResponse } from "next/server";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { Movie } from "@/lib/types";
export default function Card1({ movie }: { movie: Movie }){
    const router =useRouter()
    return(
        
        <>
            <div className="relative w-[170px] h-[260px] md:w-[225px] md:h-[340px] rounded-xl overflow-hidden group  origin-bottom transition-transform duration-300 ease-out hover:scale-105" onClick={()=>router.push(`/movie/${movie.id}`)}>
            <Image
                src={movie.poster_url}
                alt={movie.title}
                fill
                className="object-cover z-0 "
            />
            <div className=" opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-black/60 text-white p-2">
                    <a href="">{movie.title}</a>
            </div>
            <div className=" absolute top-2 left-2  bg-black/60 text-white p-2 font-[family-name:var(--font-playfair)] text-sm">
                    <a href="">{movie.title}</a>
            </div>
        </div>

        
        
        </>

    );
}


