import { Request, Response } from "express";
import { connection } from "../database/db.js";

export async function getMovies(req: Request, res: Response){

    try{

      const movies = await connection.query(`SELECT * FROM movies`);


        res.send(movies.rows).status(200)

    } catch(err){
        console.log(err);
        res.sendStatus(500)
        
    }

}

export async function insertMovie(req: Request, res: Response){
    const {title, platform, genre} = req.body;

    try{

      const movies = await connection.query(`SELECT * FROM movies`);


        res.send(movies.rows).status(200)

    } catch(err){
        console.log(err);
        res.sendStatus(500)
        
    }

}

export async function updateMovie(req: Request, res: Response){
    const {title, platform, genre} = req.body;

    try{

      const movies = await connection.query(`SELECT * FROM movies`);


        res.send(movies.rows).status(200)

    } catch(err){
        console.log(err);
        res.sendStatus(500)
        
    }

}

export async function deleteMovie(req: Request, res: Response){
    const {title, platform, genre} = req.body;

    try{

      const movies = await connection.query(`SELECT * FROM movies`);


        res.send(movies.rows).status(200)

    } catch(err){
        console.log(err);
        res.sendStatus(500)
        
    }

}