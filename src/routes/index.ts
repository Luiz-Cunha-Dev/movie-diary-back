import { Router} from "express";
import moviesRouter from "./movies.routes.js";

const router = Router();

router.use(moviesRouter);

export default router;