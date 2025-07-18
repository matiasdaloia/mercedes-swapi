import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { peopleService } from "./peopleService";
import type { PeopleApiResponse, PeopleQueryParams } from "./types";

export const peopleKeys = {
  list: (params: PeopleQueryParams) => ["people", params] as const,
};

export function usePeople(
  params: PeopleQueryParams = {}
): UseQueryResult<PeopleApiResponse, Error> {
  return useQuery({
    queryKey: peopleKeys.list(params),
    queryFn: () => peopleService.getPeople(params),
  });
}
