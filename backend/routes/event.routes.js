import express from "express";
import { getClubs } from "../controllers/events.controller.js";

const router = express();

router.get("/get-clubs", getClubs);

export default router;