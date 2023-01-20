import { Request, Response } from "express";
import { connection } from "../database/db.js";

export async function getMovies(req: Request, res: Response) {
  try {
    const movies = await connection.query(
      `SELECT movies.id, movies.title, movies.status,
        platforms.name AS platform, genres.name AS genre, reviews.score 
      FROM movies 
      JOIN platforms ON movies."platformId" = platforms. id 
      JOIN genres ON movies."genreId" = genres.id
      LEFT JOIN reviews ON movies.id = reviews."movieId"
      `
    );

    res.send(movies.rows).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertMovie(req: Request, res: Response) {
  const { title, platform, genre } = req.body;

  try {
    let registeredGender = await connection.query(
      `SELECT * FROM genres WHERE name = $1`,
      [genre]
    );

    if (registeredGender.rowCount === 0) {
      await connection.query(`INSERT INTO genres (name) VALUES ($1)`, [genre]);
      registeredGender = await connection.query(
        `SELECT * FROM genres WHERE name = $1`,
        [genre]
      );
    }

    let registeredPlatform = await connection.query(
      `SELECT * FROM platforms WHERE name = $1`,
      [platform]
    );

    if (registeredPlatform.rowCount === 0) {
      await connection.query(`INSERT INTO platforms (name) VALUES ($1)`, [
        platform,
      ]);
      registeredPlatform = await connection.query(
        `SELECT * FROM platforms WHERE name = $1`,
        [platform]
      );
    }

    await connection.query(
      `INSERT INTO movies (title, "platformId", "genreId") VALUES ($1, $2, $3)`,
      [title, registeredPlatform.rows[0].id, registeredGender.rows[0].id]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateMovie(req: Request, res: Response) {
  const { id } = req.params;
  const {score} = req.body;

  if(!score){
    res.sendStatus(400);
    return;
  }

  try {
    let movie = await connection.query(`SELECT * FROM movies WHERE id = $1`, [
      id,
    ]);

    if (movie.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    await connection.query(`UPDATE movies SET status = $1 WHERE id = $2`, [
        !movie.rows[0].status,
        id,
      ]);

      movie = await connection.query(`SELECT * FROM movies WHERE id = $1`, [
        id,
      ]);

      if(movie.rows[0].status === false){
        await connection.query(`DELETE FROM reviews WHERE "movieId" = $1`, [
            movie.rows[0].id
          ]);
          res.sendStatus(200);
          return
      }

    await connection.query(`INSERT INTO reviews ("movieId", score) VALUES ($1, $2)`, [
        movie.rows[0].id,
        score,
      ]);

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteMovie(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const movie = await connection.query(`SELECT * FROM movies WHERE id = $1`, [
      id,
    ]);

    if (movie.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    await connection.query(`DELETE FROM movies WHERE id = $1`, [id]);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
