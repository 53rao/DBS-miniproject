"use client"
import { useState } from "react"
import { Genre_Name } from "@/lib/types";
import { Language_Name } from "@/lib/types";
import Navbar from "@/components/navbar";
import toast from "react-hot-toast";
export default function Add(){
    const [error,setError]=useState("")
    const [form, setForm] = useState({
        title: "",
        age_rating: "",
        banner_url: "",
        poster_url: "",
        country: "",

        // optional 
        synopsis: "",
        runtime: "",
        release_date: "",
        release_type: "",
        classification: "",
        collection_name: "",
        trailer_url: "",
        ott_url: "",
        ott_platform: "",

        // Arrays
        genres: [] as Genre_Name[],
        language: [] as Language_Name[],
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleMultiToggle=<T extends string>(field: "genres"|"language",value:T)=>{
        setForm((prev)=>{
            const arr = prev[field] as T[];
            return {
                ...prev,
                [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            }
        })
    }
    const handlesubmit=async()=>{
        try{
            await fetch("/api/movies/add",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
            })
            toast.success("Movie added to db")
         }
        catch(error){
            if (error instanceof Error) {
                    setError(error.message);
            } else {
                    setError("Something went wrong");
            }
        }
        
        
    }

    const resettForm=()=>{
        setForm({
            title: "", age_rating: "", banner_url: "", poster_url: "", country: "",
            synopsis: "", runtime: "", release_date: "", release_type: "",
            classification: "", collection_name: "", trailer_url: "", ott_url: "",
            ott_platform: "", genres: [], language: [],
        });
    }
    return (
        <div className="min-h-screen w-screen bg-zinc-950 text-white">
            <Navbar />
            <div className="pt-20 w-screen">
                <form className="w-full grid grid-cols-3 items-center px-20 justify-center gap-y-5"
                        onSubmit={handlesubmit}>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Title <span className="text-orange-500">*</span></label>
                        <input type="text"  required className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Rating <span className="text-orange-500">*</span></label>
                        <select name="age_rating" value={form.age_rating} onChange={handleChange} required
                            className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white text-sm transition-colors">
                                <option value="">Select Rating</option>
                                    {["U", "UA", "A", "S", "G", "PG", "PG-13", "R", "NC-17"].map((r) => (
                                        <option key={r}>{r}</option>
                                    ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 col-start-1 col-end-4 row-start-2 row-end-3">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Synopsis </label>
                            <textarea
                                placeholder="Enter description/Synposis" required className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-full h-28 text-white placeholder-zinc-600 text-sm resize-none transition-colors" name="synopsis" value={form.synopsis} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider" >Runtime[mins] </label>
                            <input type="number" name="runtime" value={form.runtime}  inputMode="numeric" min={0} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Release Date</label>
                            <input type="date" name="release_date" value={form.release_date} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Country<span className="text-orange-500">*</span></label>
                            <input required type="text" name="country" value={form.country} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">  Release Type</label>
                        <select name="release_type" value={form.release_type} onChange={handleChange} 
                            className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white text-sm transition-colors">
                                <option value="">Select Release Type</option>
                                    {[" Theatrical","OTT"].map((r) => (
                                        <option key={r}>{r}</option>
                                    ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Banner Url<span className="text-orange-500">*</span></label>
                            <input required type="text" name="banner_url" value={form.banner_url} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Poster Url<span className="text-orange-500">*</span></label>
                            <input  required type="text" name="poster_url" value={form.poster_url} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1 ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Trailer url<span className="text-orange-500">*</span></label>
                            <input type="text" name="trailer_url" value={form.trailer_url} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1  ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Collection Name</label>
                            <input type="text" name="collection_name" value={form.collection_name} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">OTT platform <span className="text-orange-500">*</span></label>
                        <select name="ott_platform" value={form.ott_platform} onChange={handleChange} 
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white text-sm transition-colors">

                            <option value="">Select platform</option>
                            {["Netflix","Prime Video","Disney+ Hotstar","JioCinema","SonyLIV","ZEE5","Apple TV+","Mubi"].map((p) => (
                                <option key={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1  ">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">OTT Url</label>
                            <input type="text" name="ott_url" value={form.ott_url} onChange={handleChange} className="px-3 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 focus:border-orange-500 focus:outline-none rounded-lg w-80 text-white placeholder-zinc-600 text-sm transition-colors"/>
                    </div>
                    <div className="col-start-1 col-end-4 flex flex-col gap-3 border-t border-zinc-800 pt-6">
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Genres</p>
                        {form.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {form.genres.map((g) => (
                                    <span key={g} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 font-medium">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="border border-zinc-700 rounded-xl p-3 max-h-44 overflow-y-auto bg-zinc-900 grid grid-cols-3 gap-x-4 gap-y-1.5">
                            {(Object.values(Genre_Name) as Genre_Name[]).map((g) => (
                                <label key={g} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-orange-400 py-0.5 transition-colors">
                                    <input type="checkbox" checked={form.genres.includes(g)}
                                        onChange={() => handleMultiToggle("genres", g)}
                                        className="accent-orange-500"/>
                                    {g}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* ── Languages ── */}
                    <div className="col-start-1 col-end-4 flex flex-col gap-3 border-t border-zinc-800 pt-6 pb-10">
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Languages</p>
                        {form.language.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {form.language.map((l) => (
                                    <span key={l} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 font-medium">
                                        {l}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="border border-zinc-700 rounded-xl p-3 max-h-36 overflow-y-auto bg-zinc-900 grid grid-cols-3 gap-x-4 gap-y-1.5">
                            {(Object.values(Language_Name) as Language_Name[]).map((l) => (
                                <label key={l} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-orange-400 py-0.5 transition-colors">
                                    <input type="checkbox" checked={form.language.includes(l)}
                                        onChange={() => handleMultiToggle("language", l)}
                                        className="accent-orange-500"/>
                                    {l}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="col-start-1 col-end-4 flex justify-end py-6 border-t border-zinc-800">
                        <button type="submit" className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer">
                            Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}