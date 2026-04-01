"use client"

import Navbar from '@/components/navbar';
import { useEffect,useState } from 'react';
import { Movie } from '@/lib/types';
import Card1 from '@/components/card1';
import Hero from '@/sections/hero';

export default function Explore() {
  const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {
           const res = await fetch("/api/movies");
           const { data } = await res.json(); 
           
            setMovies(data);
            console.log(data)
        };
        
        fetchMovies();
    }, []);
  return (
    <div className=" bg-zinc-900 min-h-screen w-screen overflow-hidden flex flex-col items-center">
      <Navbar />
      <main className=" w-screen min-h-screen pt-10">
        <div className="hero   flex items-center h-screen w-screen justify-center  ">
        <section className="second sm:px-5 xl:px-15">
                    <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold "> Trending <a className='text-amber-600'>Now</a></h1>
                    <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 w-full gap-4 md:gap-6 my-5">
                        {movies.map((movie) => (
                            <Card1 key={movie.title} movie={movie}/>
                        ))}
                    </div>
        </section>
            
        </div>
      </main>
      
      
    </div>
  );
}
