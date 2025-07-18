export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetsApiResponse {
  count: number;
  page: number;
  total_pages: number;
  next: boolean;
  previous: boolean;
  results: Planet[];
}

export interface PlanetsQueryParams {
  page?: number;
  search?: string;
  sort_by?: "name" | "created";
  order?: "asc" | "desc";
}

export type SortField = "name" | "created";
export type SortOrder = "asc" | "desc";
