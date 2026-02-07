import api from "./axios";

export const checkEligibility = async (data) => {
  const res = await api.post("/eligibility/check", data);
  return res.data;
};
