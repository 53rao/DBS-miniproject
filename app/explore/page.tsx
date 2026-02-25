"use client"
import Image from 'next/image'

import Navbar from "../components/navbar";
import { useEffect,useState } from 'react';
import { Movie } from '../types';
import card1 from '../components/card1';
import Card1 from '../components/card1';

export default  function Explore() {
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
    <div className="relative bg-black min-h-screen w-screen overflow-hidden flex flex-col items-center">
      <Navbar />
      <main className=" w-screen  min-h-screen">
        <div className=" hero w-full min-h-screen relative">
            <Image
                className='w-full h-full object-cover opacity-60 absolute'
                src="https://2rck6md413.ufs.sh/f/y3TWFhCmBVgxz8xfMMOUMlryKvFqbTP9RoeBjdYfkIxcDnC3"
                fill
                alt="Recommnedation of the week"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80  to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60  to-transparent" /> 
        </div>
        <section className="second sm:px-5 xl:px-15">
            <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold "> Trending <a className='text-amber-600'>Now</a></h1>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 w-full md:gap-4 my-5  ">
                {movies.map((movie) => (
                    <Card1 key={movie.title} movie={movie}/>
                ))}
            </div>
        </section>
      </main>
      
      
    </div>
  );
}
