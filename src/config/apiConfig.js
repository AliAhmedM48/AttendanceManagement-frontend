const BASE_URL = "https://localhost:7264/api";

export const API_ENDPOINTS = {
  BASE_URL: BASE_URL,
  AUTH: {
    LOGIN: `${BASE_URL}/Auth/login`,
    VALIDATE_TOKEN: `${BASE_URL}/Auth/validate-token`,
  },
  AUTH_ME_EMPLOYEES: {
    GET_SIGNATURE: (signatureFileName) =>
      `${BASE_URL}/Employees/me/signatures/${signatureFileName}`,
    PROFILE: `${BASE_URL}/Employees/me/profile`,
    ATTENDANCES_HISTORY: `${BASE_URL}/Employees/me/attendances`,
    GET_TODAY_ATTENDANCE: `${BASE_URL}/Employees/me/attendance/today`,
  },
  EMPLOYEES: {
    GET_ALL: `${BASE_URL}/Employees`,
    CREATE: `${BASE_URL}/Employees`,
    UPDATE: (id) => `${BASE_URL}/Employees/${id}`,
    DELETE: (id) => `${BASE_URL}/Employees/${id}`,
    UPDATE_SIGNATURE: (id) => `${BASE_URL}/Employees/${id}/signature`,
  },
  ATTENDANCES: {
    GET_ALL: `${BASE_URL}/Attendances`,
    CHECK_IN: `${BASE_URL}/Attendances/check-in`,
    CHECK_OUT: (id) => `${BASE_URL}/Attendances/check-out/${id}`,
    DELETE: (id) => `${BASE_URL}/Attendances/${id}`,
  },
};
