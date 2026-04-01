-- CreateTable
CREATE TABLE "MovieView" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MovieView_movie_id_idx" ON "MovieView"("movie_id");

-- CreateIndex
CREATE INDEX "MovieView_viewed_at_idx" ON "MovieView"("viewed_at");

-- AddForeignKey
ALTER TABLE "MovieView" ADD CONSTRAINT "MovieView_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieView" ADD CONSTRAINT "MovieView_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
