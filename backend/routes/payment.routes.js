import express from "express";
import { confirmMembership, paymentHandler } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/pay", paymentHandler);
router.post("/confirm-membership", confirmMembership);

export default router;