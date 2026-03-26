"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function createMovie(
  data: Prisma.MovieCreateInput
) {
  try {
    const newMovie = await prisma.movie.create({
      data,
      include: {
        genres: true,
        language: true,
      },
    });

    return newMovie;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
}