import { ApiResponse } from './api-response';

export interface VpicModelDto {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface ModelList extends ApiResponse<VpicModelDto[]> {}
