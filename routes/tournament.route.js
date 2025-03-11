import express from "express";
import { getAllTournament, registerTournament } from "../controllers/tournament.controller.js";

const tournamentRouter = express.Router();


tournamentRouter.post("/create-tournament",registerTournament);
tournamentRouter.get("/get-tournament",getAllTournament);

export default tournamentRouter;