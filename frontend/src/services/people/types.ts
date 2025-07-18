export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PeopleApiResponse {
  count: number;
  page: number;
  total_pages: number;
  next: boolean;
  previous: boolean;
  results: Person[];
}

export interface PeopleQueryParams {
  page?: number;
  search?: string;
  sort_by?: 'name' | 'created';
  order?: 'asc' | 'desc';
}

export type SortField = 'name' | 'created';
export type SortOrder = 'asc' | 'desc';