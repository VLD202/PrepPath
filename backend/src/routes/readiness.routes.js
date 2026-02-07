import express from "express";
import { getReadinessScore } from "../controllers/readiness.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, getReadinessScore);

export default router;
