"use client"
import Image from 'next/image'

import Navbar from "../components/navbar";
import { useEffect,useState } from 'react';
import { Movie } from '../types';
import Hero from '../sections/hero';
import Card1 from '../components/card1';
export default  function Explore() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [heroMovies,setHeroMovies]=useState<Movie[]>([]);
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
    <div className="relative bg-black min-h-screen  w-screen overflow-hidden flex flex-col items-center">
      <Navbar />
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
