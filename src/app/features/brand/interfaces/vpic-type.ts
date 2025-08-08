import { ApiResponse } from './api-response';

export interface VpicTypeDto {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VpicTypeList extends ApiResponse<VpicTypeDto[]> {}
