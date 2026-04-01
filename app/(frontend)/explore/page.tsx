"use client"

import { useEffect,useState } from 'react';
import { useRouter,useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Movie } from '@/lib/types';
import Card1 from "@/components/card1";
import Navbar from '@/components/navbar';
import Hero from '@/sections/hero';



const messages: Record<string, string> = {
  not_admin: "Only admins can view that page",
}
export  default   function Explore() {
    const [movies, setMovies] = useState<Movie[]>([]);
      const searchParams = useSearchParams()
    const router= useRouter()
    useEffect(() => {
        const fetchMovies = async () => {
           const res = await fetch("/api/movies");
           const { data } = await res.json(); 
           const error = searchParams.get("error")
            setMovies(data);
            
        };
        
        fetchMovies();
    }, []);

    useEffect(() => {
      const error = searchParams.get("error")
      if (error && messages[error]) {
        toast.error(messages[error])
        router.replace("/explore", { scroll: false })
      }
    }, [searchParams]);

  return (
    
    <div className="relative bg-black min-h-screen  w-screen overflow-hidden flex flex-col items-center">
      <Navbar/>
      <main className=" w-screen   md:min-h-screen ">
        <div className=" hero w-full  md:h-screen relative">
             <Hero/>
        </div>
        <section className="second sm:px-5 xl:px-15">
            <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold "> Trending <a className='text-amber-600'>Now</a></h1>
            <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 w-full gap-4 md:gap-6 my-5">
                {movies.slice(0, 6).map((movie) => (
                    <Card1 key={movie.title} movie={movie}/>
                ))}
            </div>
        </section>
      </main>
      
      
    </div>
  );
}
