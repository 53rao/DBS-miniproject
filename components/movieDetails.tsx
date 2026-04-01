"use client"
import {  MovieDetails } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";
export default  function MovieDetail({params}:{params:{id:string}}){
    const{id}=params;
    const [movie,setMovie]=useState<MovieDetails>();
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const fetchMovie=async()=>{
        try{
        const res=await fetch(`/api/movies/${id}/details`);
        const data=await res.json()
        
        console.log(data)
        setMovie(data.data);
        console.log(movie)
        setLoading(false)
                console.log(loading)

        }catch(error){
            setLoading(false)
        }
        
    }
    fetchMovie()
    },[id])
    if(loading){
        return (
        <div className="relative top-20   ">
            <div className="relative h-[60vh] bg-zinc-900 animate-pulse rounded-md bg-muted w-screen">
                
            </div>
            <div className="md:absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full px-40 z-20 translate-y-1/2">
                <div className="relative w-47 h-70  bg-zinc-900 rounded-md">
                    
                </div>

            </div>
             <div className="absolute bottom-0 left-40 w-full px-40 z-20 text-white">
               
                {movie?.title}
            </div>
        </div>
    )
        
    }
    return (
        <div className="relative top-20 bg-black   ">
            <div className="relative h-[60vh] bg-black  rounded-md bg-muted w-screen">
                {movie?.banner_url && (
                        <Image
                        className="object-cover opacity-60"
                         src={movie.banner_url}
                        alt={movie.title ?? ""}
                        fill
                />
                )}
            </div>
            <div className="md:absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full px-40 z-20 translate-y-1/2 flex">
                <div className="relative w-47 h-70  bg-zinc-900 rounded-md">
                    {movie?.banner_url && (
                         <Image
                        className="object-cover opacity-60"
                         src={movie.poster_url}
                        alt={movie.title ?? ""}
                        fill
                        />
                     )}
                </div>
                <div className="px-10 translate-y-2/4 flex flex-col text-zinc-100">
                      <div className="text-md flex gap-2">
                        <div>{movie?.classification}</div>
                      </div>
                     <div className="text-4xl font-bold">{movie?.title}</div>
                </div>

            </div>
             
        </div>
    )
    
}