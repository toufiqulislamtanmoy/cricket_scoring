import express from "express";
import { addUser, getUsers, login } from "../controllers/user.controller.js";
const router = express.Router();


router.post("/signup",addUser);
router.get("/users",getUsers);
router.post("/login",login);

export  default router;