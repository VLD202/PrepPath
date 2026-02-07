import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import eligibilityRoutes from "./routes/eligibility.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";
import dsaRoutes from "./routes/dsa.routes.js";
import readinessRoutes from "./routes/readiness.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/readiness", readinessRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
