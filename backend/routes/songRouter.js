import { Router } from "express";
import songController from "../controllers/songController.js"; 

const songRouter = Router();

//모든 곡 표시
songRouter.get("/", songController.getAllSongs);

//id의 곡 표시
songRouter.get("/:id", songController.getSongById);

export default songRouter;