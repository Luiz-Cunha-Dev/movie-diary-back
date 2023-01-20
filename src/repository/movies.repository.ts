import { connection } from "../database/db.js";
import FullMovieInformation from "../protocols/FullMovieInformation.js";
import Genre from "../protocols/Genre.js";
import GenresCount from "../protocols/GenresCount.js";
import Movie from "../protocols/Movie.js";
import Platform from "../protocols/Platform.js";

export async function getFullInformationAllMovies(): Promise<FullMovieInformation[]>  {
  return (
    await connection.query(
      `SELECT movies.id, movies.title, movies.status,
          platforms.name AS platform, genres.name AS genre, reviews.score 
        FROM movies 
        JOIN platforms ON movies."platformId" = platforms. id 
        JOIN genres ON movies."genreId" = genres.id
        LEFT JOIN reviews ON movies.id = reviews."movieId"
        `
    )
  ).rows;
}

export async function getGenreByName(name: string): Promise<Genre[]>  {
  return (
    await connection.query(`SELECT * FROM genres WHERE name = $1`, [name])
  ).rows;
}

export async function getPlatformByName(name: string): Promise<Platform[]> {
  return (
    await connection.query(`SELECT * FROM platforms WHERE name = $1`, [name])
  ).rows;
}

export async function getMovieById(id: string): Promise<Movie[]> {
  return (await connection.query(`SELECT * FROM movies WHERE id = $1`, [id]))
    .rows;
}

export async function getGenres(): Promise<GenresCount[]> {
  return (await connection.query(`SELECT genres.id, genres.name AS "genreName", COUNT(movies.id) FROM genres JOIN movies ON genres.id = movies."genreId" GROUP BY genres.id`))
    .rows;
}

export async function insertNewGenre(name: string){
  return connection.query(`INSERT INTO genres (name) VALUES ($1)`, [name]);
}

export async function insertNewPlatform(name: string){
  return connection.query(`INSERT INTO platforms (name) VALUES ($1)`, [name]);
}

export async function insertNewMovie(
  title: string,
  platformId: number,
  genreId: number
){
  return connection.query(
    `INSERT INTO movies (title, "platformId", "genreId") VALUES ($1, $2, $3)`,
    [title, platformId, genreId]
  );
}

export async function updateMovieStatus(status: boolean, id: string){
  return connection.query(`UPDATE movies SET status = $1 WHERE id = $2`, [
    status,
    id,
  ]);
}

export async function deleteStatusByMovieId(id: number){
    return connection.query(`DELETE FROM reviews WHERE "movieId" = $1`, [
       id
      ]);
  }

  export async function insertNewReview(id: number, score: number){
    return connection.query(`INSERT INTO reviews ("movieId", score) VALUES ($1, $2)`, [
        id,
        score,
      ]);
  }

  export async function deleteMovieById (id: string) {
    return connection.query(`DELETE FROM movies WHERE id = $1`, [id]);;
  }

  export async function deleteReviewById (id: string) {
    return connection.query(`DELETE FROM reviews WHERE "movieId" = $1`, [id]);;
  }


