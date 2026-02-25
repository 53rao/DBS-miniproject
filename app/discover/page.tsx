import Image from 'next/image'

import Navbar from "../components/navbar";

export default function Explore() {
  return (
    <div className="relative bg-zinc-900 min-h-screen w-screen overflow-hidden flex flex-col items-center">
      <Navbar />
      <main className="absolute w-screen min-h-screen">
        <div className="hero w-full realtive">
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
      </main>
      
      
    </div>
  );
}
