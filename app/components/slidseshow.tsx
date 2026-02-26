import { Zoom } from "react-slideshow-image"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState,useEffect } from "react";
import Image from "next/image"

import "react-slideshow-image/dist/styles.css"

import { Play } from "lucide-react";
import { Movie } from "../types";
function Slidseshow() {
    
     const [images, setMovies] = useState<Movie[]>([]);
    
        useEffect(() => {
            const fetchMovies = async () => {
               const res = await fetch("/api/movies");
               const { data } = await res.json(); 
                setMovies(data);
                console.log(data)
            };
            fetchMovies();
    }, []);
    
    const zoomProps={
        scale:1,
        duration:5000,
        transitionDuration:300,
        infinite:true,
        
        autoplay: true,
        prevArrow:(
            <div className="z-10 absolute left-4">
                <ArrowLeft/>
            </div>
        ),
        nextArrow:(
            <div className="z-10 absolute right-2">
                <ArrowRight/>
            </div>
        ),
        
    }
  return (
    <div className="w-full h-full relative">
      <Zoom {...zoomProps}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-screen"> 
            <Image
              className="object-cover opacity-60"
              src={image.banner_url}
              fill
              alt={`Slide ${index + 1}`}
              priority={index === 0}
            />
            <div className="content absolute bottom-20 z-10 left-4 flex flex-col  w-[40vw] overflow-hidden gap-y-2 justify-start h-[40vh] mx-10">
              <h1 className="bg-amber-600/10 text-[#f97316] w-fit px-4 py-0.5 border-1 rounded-sm border-amber-600 text-sm"> 🔥 Featured Film</h1>
              <h1 className="text-6xl text-white font-[family-name:var(--font-playfair)] font-bold ">{image.title}</h1>
              <div className=" gap-4  flex">
                <div className="">Mins : {image?.runtime??"**"}</div>
                <div >{new Date(image.release_date).getFullYear()}</div>
              </div>
              <div className="text-sm text-[#ffffffaa]">{image?.synopsis}</div>
              <a href={image.trailer_url} target="blank" className="py-2 px-6 bg-[#f97316] text-white w-fit text-md my-4 flex gap-2 items-center rounded-md ">
                <Play fill="white" stroke="white"/>
                Watch Now</a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
        ))}
      </Zoom>
    </div>
  )
}

export default Slidseshow