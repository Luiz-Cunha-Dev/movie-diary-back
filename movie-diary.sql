CREATE DATABASE "movie-diary";

CREATE TABLE "movies" (
	"id" serial NOT NULL PRIMARY KEY,
	"title" TEXT NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT false,
	"platformId" integer NOT NULL,
	"genreId" integer NOT NULL
);



CREATE TABLE "platforms" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);



CREATE TABLE "genres" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "reviews" (
	"id" serial NOT NULL PRIMARY KEY,
	"movieId" integer NOT NULL UNIQUE,
	"score" integer NOT NULL
);



ALTER TABLE "movies" ADD CONSTRAINT "movies_fk0" FOREIGN KEY ("platformId") REFERENCES "platforms"("id");
ALTER TABLE "movies" ADD CONSTRAINT "movies_fk1" FOREIGN KEY ("genreId") REFERENCES "genres"("id");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("movieId") REFERENCES "movies"("id");




