import api from "./axios";

export const fetchRoadmap = async (domain) => {
  const res = await api.post("/roadmap", { domain });
  return res.data;
};
