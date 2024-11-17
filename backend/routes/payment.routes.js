import express from "express";
import { confirmMembership, paymentHandler } from "../controllers/payment.controller.js";
import { confirmRegistration, registrationHandler } from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/pay", paymentHandler);
router.post("/confirm-membership", confirmMembership);
router.post("/register", registrationHandler);
router.post("/confirm-registration", confirmRegistration);

export default router;