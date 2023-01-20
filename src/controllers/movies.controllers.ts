import { Request, Response } from "express";
import {
  deleteMovieById,
  deleteReviewById,
  deleteStatusByMovieId,
  getFullInformationAllMovies,
  getGenreByName,
  getGenres,
  getMovieById,
  getPlatformByName,
  insertNewGenre,
  insertNewMovie,
  insertNewPlatform,
  insertNewReview,
  updateMovieStatus,
} from "../repository/movies.repository.js";

export async function getMovies(req: Request, res: Response) {
  try {
    const movies = await getFullInformationAllMovies();

    res.send(movies).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertMovie(req: Request, res: Response) {

    type BodyInformation = {
        title: string,
        platform: string,
        genre: string
    }

  const { title, platform, genre } = req.body as BodyInformation;

  try {
    let registeredGenre = await getGenreByName(genre);

    if (registeredGenre.length === 0) {
      await insertNewGenre(genre);
      registeredGenre = await getGenreByName(genre);
    }

    let registeredPlatform = await getPlatformByName(platform);

    if (registeredPlatform.length === 0) {
      await insertNewPlatform(platform);
      registeredPlatform = await getPlatformByName(platform);
    }

    await insertNewMovie(
      title,
      registeredPlatform[0].id,
      registeredGenre[0].id
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateMovie(req: Request, res: Response) {
  const { id } = req.params;

  type BodyInformation = {
    score: number
  }

  const { score } = req.body as BodyInformation;

  try {
    let movie = await getMovieById(id);

    if (movie.length === 0) {
      res.sendStatus(404);
      return;
    }

    await updateMovieStatus(!movie[0].status, id);

    movie = await getMovieById(id);

    if (movie[0].status === false) {
      await deleteStatusByMovieId(movie[0].id);
      res.sendStatus(200);
      return;
    } else {
      if (!score) {
        res.sendStatus(400);
        return;
      }
    }

    await insertNewReview(movie[0].id, score);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteMovie(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);

    if (movie.length === 0) {
      res.sendStatus(404);
      return;
    }

    await deleteReviewById(id);
    await deleteMovieById(id);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getNumberOfMoviesByGenre(req: Request, res: Response) {
  
    try {

    const genres = await getGenres();
  
      res.send(genres).status(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }