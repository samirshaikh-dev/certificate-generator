/**
 * Application API Endpoints
 */

export const API_ENDPOINTS = {
  CERTIFICATES: "/api/certificates",
  CERTIFICATE_BY_ID: (id) => `/api/certificates/${encodeURIComponent(id)}`,
};

export default API_ENDPOINTS;
