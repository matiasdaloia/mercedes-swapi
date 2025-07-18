import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { PlanetsApiResponse, PlanetsQueryParams } from "./types";
import { planetsService } from "./planetsService";

export const planetsKeys = {
  list: (params: PlanetsQueryParams) => ["planets", params] as const,
};

export function usePlanets(
  params: PlanetsQueryParams = {}
): UseQueryResult<PlanetsApiResponse, Error> {
  return useQuery({
    queryKey: planetsKeys.list(params),
    queryFn: () => planetsService.getPlanets(params),
  });
}
