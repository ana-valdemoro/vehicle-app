export interface ApiResponse<T> {
  Results: T;
  Count: number;
  Message: string;
  SearchCriteria: string;
}
