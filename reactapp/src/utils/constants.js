export const API_BASE_URL = "http://localhost:8080/api";

export const ENDPOINTS = {
  JOBS: `${API_BASE_URL}/jobs`,
  JOB_SEARCH: `${API_BASE_URL}/jobs/search`,
  JOB_DETAIL: (id) => `${API_BASE_URL}/jobs/${id}`,
};
