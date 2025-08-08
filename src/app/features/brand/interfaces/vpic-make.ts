import { ApiResponse } from './api-response';

export interface MakeDto {
  Make_ID: number;
  Make_Name: string;
}

export interface MakeList extends ApiResponse<MakeDto[]> {}
