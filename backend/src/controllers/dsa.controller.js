import DsaProgress from "../models/DsaProgress.js";

export const updateProgress = async (req, res) => {
  const { easy, medium, hard } = req.body;

  let progress = await DsaProgress.findOne({ user: req.user.id });

  if (!progress) {
    progress = await DsaProgress.create({
      user: req.user.id,
      easy,
      medium,
      hard
    });
  } else {
    progress.easy = easy;
    progress.medium = medium;
    progress.hard = hard;
    await progress.save();
  }

  res.json({
    message: "DSA progress updated",
    progress
  });
};

export const getProgress = async (req, res) => {
  const progress = await DsaProgress.findOne({ user: req.user.id });

  res.json(progress);
};
