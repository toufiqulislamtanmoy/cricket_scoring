import express from "express";
import { getAllTeams, registerTeams } from "../controllers/team.controller.js";



const teamRouter = express.Router();


teamRouter.post("/create-team",registerTeams);
teamRouter.get("/get-teams",getAllTeams);

export default teamRouter;