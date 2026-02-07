import DsaProgress from "../models/DsaProgress.js";

export const getReadinessScore = async (req, res) => {
  const { cgpa, roadmapCompleted, roadmapTotal } = req.body;

  const dsa = await DsaProgress.findOne({ user: req.user.id });

  if (!dsa) {
    return res.status(400).json({ message: "DSA data not found" });
  }

  const cgpaPercent = (cgpa / 10) * 100;

  const dsaSolved = dsa.easy + dsa.medium + dsa.hard;
  const dsaTarget = 150; // Product-based default
  const dsaPercent = (dsaSolved / dsaTarget) * 100;

  const roadmapPercent = (roadmapCompleted / roadmapTotal) * 100;

  const readinessScore =
    cgpaPercent * 0.3 +
    dsaPercent * 0.4 +
    roadmapPercent * 0.3;

  res.json({
    readinessScore: Math.round(readinessScore),
    breakdown: {
      cgpa: cgpaPercent,
      dsa: dsaPercent,
      roadmap: roadmapPercent
    }
  });
};
