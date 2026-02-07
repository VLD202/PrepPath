import api from "./axios";

export const fetchReadiness = async () => {
  const res = await api.post("/readiness", {
    cgpa: 7.5,
    roadmapCompleted: 3,
    roadmapTotal: 5
  });
  return res.data;
};
