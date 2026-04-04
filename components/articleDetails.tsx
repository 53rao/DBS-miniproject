"use client"
import { Articles } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";
 

export default  function ArticleDetails({params}:{params:{article_id:string}}){
    const{article_id}=params;
    const [article,setArticle]=useState<Articles>();
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const fetchMovie=async()=>{
        try{
        const res=await fetch(`/api/articles/${article_id}/details`);
        const data=await res.json()
        
        console.log(data)
        setArticle(data.article);
        console.log(article)
        setLoading(false)
        console.log(data)

        }catch(error){
            setLoading(false)
        }
        
    }
    fetchMovie()
    },[article_id])
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
               
                {article?.article_title}
            </div>
            
        </div>
    )
        
    }
    return (
        <div className="relative top-20 bg-black   ">
         

             <div className="relative h-[60vh] bg-black  rounded-md bg-muted w-screen">
                {article && (
                        <Image
                        className="object-cover opacity-60"
                         src={article.movie?.banner_url || "fallback.svg"}
                        alt={article.article_title ?? ""}
                        fill
                />
                )}
                 <div className="md:absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            </div>

           
            <div className="px-30 bg-black">
    
                <div className="flex items-end gap-8 -mt-32 relative z-20">
                    <div className="relative w-48 h-72 bg-zinc-900 rounded-md overflow-hidden shrink-0">
                        {article?.movie?.poster_url && (
                            <Image
                                className="object-cover"
                                src={article.movie.poster_url}
                                alt={article.article_title ?? ""}
                                fill
                            />
                        )}
                    </div>

                    <div className="flex flex-col text-zinc-400 pb-4">
                        <div className="text-sm">
                            {article?.published_at && new Date(article.published_at).getFullYear()}
                        </div>
                        <div className="text-6xl font-bold text-white">{article?.article_title}</div>
                    </div>
                </div>

                <div className="flex gmt-12 justify-between">
                    <div className="max-w-3xl  w-full flex items-start flex-row">
                    <div className="flex-1">
                    <div className="  bg-zinc-500 mb-8 rounded-full " />
                        <div className="font-serif text-lg leading-loose text-zinc-400 
                            [&>p]:mb-6 
                            [&>p:first-child]:first-letter:float-left 
                            [&>p:first-child]:first-letter:text-7xl 
                            [&>p:first-child]:first-letter:leading-none 
                            [&>p:first-child]:first-letter:mr-2 
                            [&>p:first-child]:first-letter:mt-1 
                             [&>p:first-child]:first-letter:text-zinc-200
                            [&>p:first-child]:first-letter:font-serif">
                                    {article?.content?.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col gap-y-4 mt-10">
                        <h1 className="text-4xl font-serif font-bold text-orange-500">Related Articles</h1>
                        <div className="bg-zinc-800  shrink=0 w-100 h-100"></div>
                        <div className="bg-zinc-800  shrink=0 w-100 h-50 flex items-center  text-2xl justify-center font-bold"> 
                            Ad's Soon
                        </div>
                    </div>
                </div>
               

            </div>
            
        </div>
        
  
    )
    
}