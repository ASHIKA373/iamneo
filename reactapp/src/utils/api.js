import axios from "axios";
import { ENDPOINTS } from "./constants";

export const fetchJobs = async () => {
  const response = await axios.get(ENDPOINTS.JOBS);
  return response.data;
};

export const searchJobs = async (keyword) => {
  const response = await axios.get(ENDPOINTS.JOB_SEARCH, {
    params: { keyword },
  });
  return response.data;
};

export const fetchJobById = async (jobId) => {
  const response = await axios.get(ENDPOINTS.JOB_DETAIL(jobId));
  return response.data;
};
