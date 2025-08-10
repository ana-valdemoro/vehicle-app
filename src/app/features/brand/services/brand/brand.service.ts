import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { VehicleType } from '../../interfaces/vehicle-type';
import { VpicApiResponse } from '../../interfaces/api-response';
import { VpicMakeDto } from '../../interfaces/vpic-make';
import { VpicModelDto } from '../../interfaces/vpic-model';
import { VpicTypeDto } from '../../interfaces/vpic-type';
import { environment } from '../../../../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private http = inject(HttpClient);

  getAllMakes(): Observable<VehicleBrand[]> {
    const url = `${environment.baseUrl}/GetAllMakes?format=json`;
    return this.http.get<VpicApiResponse<VpicMakeDto[]>>(url).pipe(
      map(({ Results }) =>
        Results.map(make => ({
          id: make.Make_ID,
          name: make.Make_Name,
        })),
      ),
    );
  }

  getModelsByBrand(brandId: number): Observable<VehicleModel[]> {
    const url = `${environment.baseUrl}/GetModelsForMakeId/${brandId}?format=json`;
    return this.http.get<VpicApiResponse<VpicModelDto[]>>(url).pipe(
      map(({ Results }) =>
        Results.map(({ Model_ID, Model_Name }) => ({
          id: Model_ID,
          name: Model_Name,
        })),
      ),
    );
  }

  getVehicleTypesByBrand(brandId: number): Observable<VehicleType[]> {
    const url = `${environment.baseUrl}/GetVehicleTypesForMakeId/${brandId}?format=json`;
    return this.http.get<VpicApiResponse<VpicTypeDto[]>>(url).pipe(
      map(({ Results }) =>
        Results.map(({ VehicleTypeId, VehicleTypeName }) => ({
          id: VehicleTypeId,
          name: VehicleTypeName,
        })),
      ),
    );
  }
}
