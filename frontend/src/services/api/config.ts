export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  endpoints: {
    people: "/people",
    planets: "/planets",
  },
} as const;
