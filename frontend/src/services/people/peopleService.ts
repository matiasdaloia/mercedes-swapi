import { apiClient } from "@/services/api/client";
import { API_CONFIG } from "@/services/api/config";
import type { PeopleApiResponse, PeopleQueryParams } from "./types";

export const peopleService = {
  async getPeople(params: PeopleQueryParams = {}): Promise<PeopleApiResponse> {
    const { page = 1, search, sort_by, order = "asc" } = params;

    return apiClient<PeopleApiResponse>(API_CONFIG.endpoints.people, {
      params: {
        page,
        search,
        sort_by,
        order,
      },
    });
  },
};
