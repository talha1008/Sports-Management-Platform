import express from "express";
import { getClubById, getClubs, getEventById, getEvents, getMyClubs, getMyRegistrations } from "../controllers/events.controller.js";

const router = express();

router.get("/get-clubs", getClubs);
router.get("/get-club/:id", getClubById);
router.get("/my-clubs/:id", getMyClubs);
router.get("/get-events", getEvents);
router.get("/get-event/:id", getEventById);
router.get("/my-registrations/:id", getMyRegistrations);

export default router;