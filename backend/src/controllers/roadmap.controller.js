export const getRoadmap = (req, res) => {
  const { domain } = req.body;

  let roadmap = [];

  if (domain === "Backend") {
    roadmap = [
      { step: 1, topic: "JS + Node.js", duration: "2 weeks" },
      { step: 2, topic: "Express + MVC", duration: "1 week" },
      { step: 3, topic: "MongoDB", duration: "1 week" },
      { step: 4, topic: "Auth + Security", duration: "1 week" },
      { step: 5, topic: "System Design", duration: "1 week" }
    ];
  }

  if (domain === "Frontend") {
    roadmap = [
      { step: 1, topic: "HTML + CSS", duration: "1 week" },
      { step: 2, topic: "JavaScript", duration: "2 weeks" },
      { step: 3, topic: "React", duration: "2 weeks" },
      { step: 4, topic: "State Management", duration: "1 week" }
    ];
  }

  res.json({
    domain,
    roadmap,
    dsa: {
      level: "Medium",
      questions: 150
    }
  });
};
