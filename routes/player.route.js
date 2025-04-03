import express from "express";
import { addPlayer, updatePlayer, suspendPlayer, banPlayer, getAllPlayers, getPlayerById } from "../controllers/player.controller.js";

const router = express.Router();

router.post("/add-players", addPlayer); // Add new player
router.get("/players", getAllPlayers); // Get all players
router.get("/players/:id", getPlayerById); // Get single player
router.put("/players/:id", updatePlayer); // Update player
router.patch("/players/suspend/:id", suspendPlayer); // Suspend player
router.patch("/players/ban/:id", banPlayer); // Ban player

export default router;