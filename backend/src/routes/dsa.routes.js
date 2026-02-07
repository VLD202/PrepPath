import express from "express";
import { updateProgress, getProgress } from "../controllers/dsa.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/update", authMiddleware, updateProgress);
router.get("/", authMiddleware, getProgress);

export default router;
