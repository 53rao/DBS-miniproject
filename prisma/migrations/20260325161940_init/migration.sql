-- CreateEnum
CREATE TYPE "Approval" AS ENUM ('APPROVED', 'DENIED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('SKIP', 'ONE_TIME_WATCH', 'MID', 'GO_FOR_IT', 'ABSOLUTE_CINEMA');

-- CreateEnum
CREATE TYPE "WatchlistType" AS ENUM ('WATCHLIST', 'WATCHED', 'RECOMMENDED', 'RATED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "Genre_Name" AS ENUM ('ACTION', 'ADVENTURE', 'MARTIAL_ARTS', 'SUPERHERO', 'SPY', 'HEIST', 'SURVIVAL', 'DISASTER', 'MILITARY', 'MERCENARY', 'BOUNTY_HUNTER', 'THRILLER', 'PSYCHOLOGICAL', 'MYSTERY', 'CRIME', 'NOIR', 'TRUE_CRIME', 'CONSPIRACY', 'LEGAL', 'DETECTIVE', 'WHODUNIT', 'HORROR', 'SLASHER', 'SUPERNATURAL', 'PARANORMAL', 'CREATURE_FEATURE', 'ZOMBIE', 'VAMPIRE', 'WEREWOLF', 'FOLK_HORROR', 'BODY_HORROR', 'FOUND_FOOTAGE', 'COSMIC_HORROR', 'GOTHIC', 'HAUNTED_HOUSE', 'DRAMA', 'ROMANCE', 'HISTORICAL', 'BIOGRAPHICAL', 'POLITICAL', 'WAR', 'MEDICAL', 'LEGAL_DRAMA', 'FAMILY_DRAMA', 'SOCIAL', 'COMING_OF_AGE', 'TRAGEDY', 'MELODRAMA', 'PERIOD_DRAMA', 'COMEDY', 'DARK_COMEDY', 'ROMANTIC_COMEDY', 'PARODY', 'SATIRE', 'SLAPSTICK', 'MOCKUMENTARY', 'STAND_UP', 'SKETCH', 'SCIENCE_FICTION', 'CYBERPUNK', 'STEAMPUNK', 'DYSTOPIAN', 'UTOPIAN', 'POST_APOCALYPTIC', 'TIME_TRAVEL', 'SPACE_OPERA', 'ALIEN', 'BIOPUNK', 'SOLARPUNK', 'HARD_SCIFI', 'SOFT_SCIFI', 'MECHA', 'FANTASY', 'HIGH_FANTASY', 'LOW_FANTASY', 'DARK_FANTASY', 'URBAN_FANTASY', 'EPIC_FANTASY', 'FAIRY_TALE', 'MYTHOLOGY', 'SWORD_AND_SORCERY', 'PORTAL_FANTASY', 'ISEKAI', 'CULTIVATION', 'WUXIA', 'XIANXIA', 'ANIMATION', 'STOP_MOTION', 'CGI', 'SHONEN', 'SHOJO', 'SEINEN', 'JOSEI', 'KODOMOMUKE', 'SLICE_OF_LIFE', 'ISEKAI_REINCARNATION', 'MAGICAL_GIRL', 'SCHOOL', 'HAREM', 'REVERSE_HAREM', 'ECCHI', 'SPORTS_ANIME', 'MUSIC_ANIME', 'COOKING_ANIME', 'GAME_ANIME', 'IDOL_ANIME', 'VILLAINESS', 'ISEKAI_VILLAINESS', 'DEMON_SLAYER_TYPE', 'MOE', 'IYASHIKEI', 'BATTLE_SHONEN', 'POWER_FANTASY', 'REVERSE_ISEKAI', 'OTOME_GAME', 'DUNGEON', 'VIRTUAL_REALITY', 'CARD_GAME', 'TOURNAMENT', 'ALCHEMY', 'NINJA', 'SAMURAI', 'PIRATE', 'SPACE_ANIME', 'PSYCHOLOGICAL_ANIME', 'HORROR_ANIME', 'ROMANCE_ANIME', 'DRAMA_ANIME', 'COMEDY_ANIME', 'CRIME_ANIME', 'SUPERNATURAL_ANIME', 'HISTORICAL_ANIME', 'SCI_FI_ANIME', 'DONGHUA', 'PROCEDURAL', 'ANTHOLOGY', 'MINI_SERIES', 'SOAP_OPERA', 'TELENOVELA', 'REALITY', 'TALK_SHOW', 'GAME_SHOW', 'NEWS', 'DOCUSERIES', 'LIMITED_SERIES', 'WEBSERIES', 'DOCUMENTARY', 'NATURE', 'BIOGRAPHY', 'TRAVEL', 'FOOD_DOC', 'HISTORY_DOC', 'SCIENCE_DOC', 'CRIME_DOC', 'SPORTS_DOC', 'MUSIC_DOC', 'FAMILY', 'KIDS', 'MUSICAL', 'CONCERT', 'SPORTS', 'EXPERIMENTAL', 'SHORT_FILM', 'SILENT', 'EROTIC', 'WESTERN', 'ROAD_MOVIE', 'BUDDY', 'ENSEMBLE');

-- CreateEnum
CREATE TYPE "Language_Name" AS ENUM ('ENGLISH', 'SPANISH', 'FRENCH', 'HINDI', 'MANDARIN', 'CANTONESE', 'JAPANESE', 'KOREAN', 'GERMAN', 'ITALIAN', 'PORTUGUESE', 'RUSSIAN', 'ARABIC', 'TURKISH', 'TAMIL', 'TELUGU', 'MALAYALAM', 'KANNADA', 'BENGALI', 'MARATHI', 'PUNJABI', 'URDU', 'THAI', 'INDONESIAN', 'SWEDISH', 'DANISH', 'NORWEGIAN', 'DUTCH', 'POLISH', 'UKRAINIAN', 'PERSIAN', 'HEBREW', 'TULU');

-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('ACTOR', 'DIRECTOR', 'PRODUCER', 'WRITER', 'CINEMATOGRAPHER', 'COMPOSER', 'EDITOR', 'COSTUME_DESIGNER', 'VOICE_ACTOR', 'ANIMATOR');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "runtime" INTEGER,
    "release_date" TIMESTAMP(3),
    "release_type" TEXT,
    "classification" TEXT,
    "collection_name" TEXT,
    "age_rating" TEXT NOT NULL,
    "trailer_url" TEXT,
    "banner_url" TEXT NOT NULL,
    "poster_url" TEXT NOT NULL,
    "ott_url" TEXT,
    "ott_platform" TEXT,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "genre_name" "Genre_Name" NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" "Language_Name" NOT NULL,
    "is_original" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "professions" "Profession"[],
    "biography" TEXT,
    "profile_url" TEXT,
    "banner_url" TEXT,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieCast" (
    "id" SERIAL NOT NULL,
    "character_name" TEXT,
    "role" "Profession",
    "movie_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "google_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "password" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "collection_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "Article" (
    "article_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "movie_id" INTEGER,
    "cover_url" TEXT NOT NULL,
    "status" "Approval" NOT NULL DEFAULT 'PROCESSING',
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Ratings" (
    "rating_id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "rating" "RatingType" NOT NULL,

    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "_MovieToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToWatchlist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GenreToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LanguageToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LanguageToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CollectionToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollectionToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_name_key" ON "Genre"("genre_name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_user_id_key" ON "Watchlist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_user_id_movie_id_key" ON "Ratings"("user_id", "movie_id");

-- CreateIndex
CREATE INDEX "_MovieToWatchlist_B_index" ON "_MovieToWatchlist"("B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- CreateIndex
CREATE INDEX "_LanguageToMovie_B_index" ON "_LanguageToMovie"("B");

-- CreateIndex
CREATE INDEX "_CollectionToMovie_B_index" ON "_CollectionToMovie"("B");

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToWatchlist" ADD CONSTRAINT "_MovieToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToWatchlist" ADD CONSTRAINT "_MovieToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("collection_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToMovie" ADD CONSTRAINT "_LanguageToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToMovie" ADD CONSTRAINT "_LanguageToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToMovie" ADD CONSTRAINT "_CollectionToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToMovie" ADD CONSTRAINT "_CollectionToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
