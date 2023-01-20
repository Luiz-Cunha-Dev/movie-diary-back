import { Router } from "express";
import { deleteMovie, getMovies, getNumberOfMoviesByGenre, insertMovie, updateMovie } from "../controllers/movies.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import movieSchemas from "../schemas/movie.schema.js";
import scoreSchema from "../schemas/score.schema.js";

const moviesRouter = Router();

moviesRouter.get("/movies", getMovies);

moviesRouter.get("/movies/genres", getNumberOfMoviesByGenre);

moviesRouter.post("/movies", schemaValidation(movieSchemas), insertMovie);

moviesRouter.put("/movies/:id", schemaValidation(scoreSchema), updateMovie);

moviesRouter.delete("/movies/:id", deleteMovie);




export default moviesRouter;