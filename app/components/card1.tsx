import { Movie } from "../types"
import Image from "next/image";
export default function Card1({ movie }: { movie: Movie }){
    return(
        
        <>
            <div className="relative w-[225px] h-[340px] rounded-xl overflow-hidden group  origin-bottom transition-transform duration-300 ease-out hover:scale-105">
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
                    <a href="">{movie.collection_name}</a>
            </div>
        </div>

        
        
        </>

    );
}


