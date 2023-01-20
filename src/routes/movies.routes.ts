import { Router } from "express";
import { deleteMovie, getMovies, insertMovie, updateMovie } from "../controllers/movies.controllers.js";

const moviesRouter = Router();

moviesRouter.get("/movies", getMovies);

moviesRouter.post("/movies", insertMovie);

moviesRouter.put("/movies", updateMovie);

moviesRouter.delete("/movies", deleteMovie);




export default moviesRouter;