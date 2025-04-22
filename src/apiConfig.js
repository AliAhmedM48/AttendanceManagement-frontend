const BASE_URL = "https://localhost:7264/api";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/Auth/login`,
  REGISTER: `${BASE_URL}/Auth/register`,
  USER_PROFILE: `${BASE_URL}/User/profile`,
  ATTENDANCE: `${BASE_URL}/Attendance`,
  LEAVE_REQUEST: `${BASE_URL}/Leave`,
};
