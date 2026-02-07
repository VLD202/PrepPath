import express from "express";
import { getRoadmap } from "../controllers/roadmap.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, getRoadmap);

export default router;
