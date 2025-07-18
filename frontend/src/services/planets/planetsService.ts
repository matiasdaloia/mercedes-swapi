import { apiClient } from "@/services/api/client";
import { API_CONFIG } from "@/services/api/config";
import type { PlanetsApiResponse, PlanetsQueryParams } from "./types";

export const planetsService = {
  async getPlanets(
    params: PlanetsQueryParams = {}
  ): Promise<PlanetsApiResponse> {
    const { page = 1, search, sort_by, order = "asc" } = params;

    return apiClient<PlanetsApiResponse>(API_CONFIG.endpoints.planets, {
      params: {
        page,
        search,
        sort_by,
        order,
      },
    });
  },
};
