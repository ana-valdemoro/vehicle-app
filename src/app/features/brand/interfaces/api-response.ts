export interface VpicApiResponse<T> {
  Results: T;
  Count: number;
  Message: string;
  SearchCriteria: string;
}
