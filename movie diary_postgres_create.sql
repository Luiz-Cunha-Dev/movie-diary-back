CREATE DATABASE "movie-diary";

CREATE TABLE "movies" (
	"id" serial NOT NULL PRIMARY KEY,
	"title" TEXT NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT false,
	"platfomId" integer NOT NULL,
	"genreId" integer NOT NULL
);



CREATE TABLE "platforms" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL
);



CREATE TABLE "genres" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL
);



ALTER TABLE "movies" ADD CONSTRAINT "movies_fk0" FOREIGN KEY ("platfomId") REFERENCES "platforms"("id");
ALTER TABLE "movies" ADD CONSTRAINT "movies_fk1" FOREIGN KEY ("genreId") REFERENCES "genres"("id");






