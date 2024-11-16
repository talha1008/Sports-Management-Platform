import express from "express";
import { getClubById, getClubs, getMyClubs } from "../controllers/events.controller.js";

const router = express();

router.get("/get-clubs", getClubs);
router.get("/get-club/:id", getClubById);
router.get("/my-clubs/:id", getMyClubs);

export default router;