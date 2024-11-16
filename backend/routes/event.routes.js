import express from "express";
import { getClubById, getClubs } from "../controllers/events.controller.js";

const router = express();

router.get("/get-clubs", getClubs);
router.get("/get-club/:id", getClubById);

export default router;