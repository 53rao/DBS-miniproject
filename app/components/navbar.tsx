"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu ,X} from "lucide-react";
const obj=[
    {title:"Home",url:"/explore"},
    {title:"Articles",url:"/articles"},
    {title:"Discover",url:"/discover"},
    {title:"Collections",url:"/collections"},
    {title:"Search",url:"/search"}

]
export default function Navbar() {
    const path=usePathname()
    const [Open,setOpen]=useState(false)

   const toggle = () => {
        setOpen(prev => !prev)
    }
  return (
    <nav className="h-20 w-full absolute bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 px-2 md:px-15 flex items-center justify-between md:justify-around">
      <div className="text-amber-600 text-3xl font-extrabold font-[family-name:var(--font-playfair)] ">FDC</div>
    {Open?<></>:
     <div className="links hidden md:flex gap-5">
        {obj.map((link)=>(
            <Link key={link.title} href={link.url} 
            className={`${
            path.startsWith(link.url)
        ? "text-orange-500 font-semibold"
        : "text-zinc-400"
        }`}>
            {link.title}</Link>
        ))}
    </div>
}
    <div className={`user hidden w-8 h-8 md:flex bg-zinc-600 rounded-full`}></div>
    {Open ? <X onClick={toggle} size={30} className="md:hidden"/> : <Menu onClick={toggle} size={30} className="md:hidden"/>}
    
    </nav>
  );
}