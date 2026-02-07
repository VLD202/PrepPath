import User from "../models/User.js";
import DsaProgress from "../models/DsaProgress.js";
import Roadmap from "../models/Roadmap.js";

/* ---------- helper functions ---------- */

const calculateEligibilityScore = (eligibility) => {
  let score = 0;

  if (eligibility.cgpa >= 9) score += 10;
  else if (eligibility.cgpa >= 5) score += 7;
  else score += 4;

  if (eligibility.backlogs === 0) score += 10;
  else if (eligibility.backlogs <= 2) score += 5;

  return score; // max 20
};

const calculateConsistencyScore = (streak) => {
  if (streak >= 30) return 10;
  if (streak >= 15) return 7;
  if (streak >= 7) return 5;
  return 2;
};

/* ---------- controller ---------- */

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ User basic info
    const user = await User.findById(userId).select("name email");

    // 2️⃣ DSA progress
    const dsaProgress = await DsaProgress.findOne({ userId });

    const completedDSA = dsaProgress?.completedCount || 0;
    const totalDSA = dsaProgress?.totalCount || 0;

    // 3️⃣ Roadmap progress
    const roadmapTopics = await Roadmap.find({ userId });

    const completedRoadmap = roadmapTopics.filter(
      (topic) => topic.status === "completed"
    ).length;

    const totalRoadmap = roadmapTopics.length;

    /* ---------- READINESS CALCULATION ---------- */

    // DSA Score (40)
    const dsaScore =
      totalDSA > 0 ? (completedDSA / totalDSA) * 40 : 0;

    // Roadmap Score (30)
    const roadmapScore =
      totalRoadmap > 0 ? (completedRoadmap / totalRoadmap) * 30 : 0;

    // Eligibility Score (20) – abhi static, baad me DB se
    const eligibility = {
      cgpa: 7.8,
      backlogs: 0
    };
    const eligibilityScore = calculateEligibilityScore(eligibility);

    // Consistency Score (10)
    const consistencyScore = calculateConsistencyScore(
      dsaProgress?.streak || 0
    );

    const placementReadiness = Math.round(
      dsaScore +
      roadmapScore +
      eligibilityScore +
      consistencyScore
    );

    /* ---------- STATUS ---------- */
    let status = "Beginner";
    if (placementReadiness >= 80) status = "Placement Ready 💼";
    else if (placementReadiness >= 60) status = "Almost Ready 🚀";
    else if (placementReadiness >= 40) status = "Needs Practice ⚠️";

    // ✅ FINAL RESPONSE
    res.status(200).json({
      user,
      dashboard: {
        dsa: {
          completed: completedDSA,
          total: totalDSA,
          score: Math.round(dsaScore)
        },
        roadmap: {
          completed: completedRoadmap,
          total: totalRoadmap,
          score: Math.round(roadmapScore)
        },
        eligibility: eligibilityScore,
        consistency: consistencyScore,
        placementReadiness,
        status
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
