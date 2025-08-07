import { ApiResponse } from './api-response';

export interface ModelDto {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_name: string;
}

export interface ModelList extends ApiResponse<ModelDto[]> {}
