import express from "express";
import { checkEligibility } from "../controllers/eligibility.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/check", authMiddleware, checkEligibility);

export default router;
