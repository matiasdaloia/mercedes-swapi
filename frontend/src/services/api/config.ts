export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  endpoints: {
    people: "/people",
    planets: "/planets",
  },
} as const;
