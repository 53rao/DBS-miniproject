import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Genre_Name, Language_Name } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            title,
            age_rating,
            banner_url,
            poster_url,
            country,
            synopsis,
            runtime,
            release_date,
            release_type,
            classification,
            collection_name,
            trailer_url,
            ott_url,
            ott_platform,
            genres,
            language,
        } = body;

        const movie = await prisma.movie.create({
            data: {
                title,
                age_rating,
                banner_url,
                poster_url,
                country,
                synopsis:        synopsis        || null,
                runtime:         runtime         ? parseInt(runtime) : null,
                release_date:    release_date    ? new Date(release_date) : null,
                release_type:    release_type    || null,
                classification:  classification  || null,
                collection_name: collection_name || null,
                trailer_url:     trailer_url     || null,
                ott_url:         ott_url         || null,
                ott_platform:    ott_platform    || null,

                genres: {
                    connect: (genres as Genre_Name[]).map((g) => ({ genre_name: g })),
                },
                language: {
                    connect: (language as Language_Name[]).map((l) => ({ name: l })),
                },
            },
        });

        return NextResponse.json({ success: true, movie }, { status: 201 });

    } catch (error) {
        console.error("[MOVIE_ADD]", error);
        return NextResponse.json({ success: false, error: "Failed to add movie" }, { status: 500 });
    }
}