export const checkEligibility = (req, res) => {
  const { cgpa, domain, targetCompany } = req.body;

  let requiredCgpa = 0;
  let dsaLevel = "";

  if (targetCompany === "Service") {
    requiredCgpa = 6.0;
    dsaLevel = "Easy";
  } else if (targetCompany === "Product") {
    requiredCgpa = 7.5;
    dsaLevel = "Medium";
  } else if (targetCompany === "FAANG") {
    requiredCgpa = 8.0;
    dsaLevel = "Hard";
  }

  if (cgpa >= requiredCgpa) {
    return res.json({
      eligible: true,
      message: "You are eligible 🎉",
      dsaLevel
    });
  }

  res.json({
    eligible: false,
    reason: "CGPA is below requirement",
    requiredCgpa,
    currentCgpa: cgpa,
    dsaLevel
  });
};
