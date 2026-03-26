"use client";

import createMovie from "@/action/addaction";
import { useState } from "react";
import { Genre_Name, Language_Name } from "@prisma/client";

type MovieForm = {
  title: string;
  synopsis: string;
  runtime: number | null;
  release_date: string;
  release_type: string;
  classification: string;
  collection_name: string;
  age_rating: string;
  trailer_url: string;
  banner_url: string;
  poster_url: string;
  ott_url: string;
  ott_platform: string;
  country: string;
  genres: Genre_Name[];        // ✅ FIXED
  language: Language_Name[];   // ✅ FIXED
};

export default function MovieFormPage() {
  const [formData, setFormData] = useState<MovieForm>({
    title: "",
    synopsis: "",
    runtime: null,
    release_date: "",
    release_type: "",
    classification: "",
    collection_name: "",
    age_rating: "",
    trailer_url: "",
    banner_url: "",
    poster_url: "",
    ott_url: "",
    ott_platform: "",
    country: "",
    genres: [],
    language: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "runtime"
          ? value === ""
            ? null
            : Number(value)
          : value,
    }));
  };

  const toggleArrayValue = (
    field: "genres" | "language",
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMovie({
        title: formData.title,
        synopsis: formData.synopsis || null,
        runtime: formData.runtime,
        release_date: formData.release_date
          ? new Date(formData.release_date)
          : null,
        release_type: formData.release_type || null,
        classification: formData.classification || null,
        collection_name: formData.collection_name || null,
        age_rating: formData.age_rating,
        trailer_url: formData.trailer_url || null,
        banner_url: formData.banner_url,
        poster_url: formData.poster_url,
        ott_url: formData.ott_url || null,
        ott_platform: formData.ott_platform || null,
        country: formData.country,

        // ✅ THIS NOW WORKS (no error)
        genres: {
          connect: formData.genres.map((g) => ({
            genre_name: g,
          })),
        },

        language: {
          connect: formData.language.map((l) => ({
            name: l,
          })),
        },
      });

      console.log("Movie created");
    } catch (err) {
      console.error(err);
    }
  };

  const genresList: Genre_Name[] = ["ACTION", "DRAMA", "COMEDY"];
  const languageList: Language_Name[] = ["ENGLISH", "HINDI", "KANNADA", "TAMIL"];

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="synopsis" placeholder="Synopsis" onChange={handleChange} />
        <input name="runtime" type="number" placeholder="Runtime" onChange={handleChange} />
        <input name="release_date" type="date" onChange={handleChange} />
        <input name="poster_url" placeholder="Poster URL" onChange={handleChange} />
        <input name="banner_url" placeholder="Banner URL" onChange={handleChange} />
        <input name="trailer_url" placeholder="Trailer URL" onChange={handleChange} />

        <div>
          <p>Genres:</p>
          {genresList.map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => toggleArrayValue("genres", g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div>
          <p>Languages:</p>
          {languageList.map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => toggleArrayValue("language", l)}
            >
              {l}
            </button>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}