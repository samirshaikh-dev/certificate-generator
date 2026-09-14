/**
 * Application Page Routes
 */

export const APP_ROUTES = {
  HOME: "/",
  VERIFY: "/verify",
  VERIFY_BY_ID: (id) => `/verify/${encodeURIComponent(id)}`,
  PUBLIC_CERTIFICATE: (id) => `/certificate/${encodeURIComponent(id)}`,
  ADMIN: {
    CERTIFICATES: "/admin/certificates",
    CREATE: "/admin/certificates/create",
    CREATE_WITH_QUERY: (query) => {
      if (!query) return "/admin/certificates/create";
      const q = typeof query === "string" ? query : new URLSearchParams(query).toString();
      return `/admin/certificates/create?${q}`;
    },
    PREVIEW: "/admin/certificates/preview",
    PREVIEW_BY_ID: (id) => `/admin/certificates/preview?id=${encodeURIComponent(id)}`,
    PREVIEW_WITH_QUERY: (query) => {
      if (!query) return "/admin/certificates/preview";
      const q = typeof query === "string" ? query : new URLSearchParams(query).toString();
      return `/admin/certificates/preview?${q}`;
    },
  },
};

export default APP_ROUTES;
