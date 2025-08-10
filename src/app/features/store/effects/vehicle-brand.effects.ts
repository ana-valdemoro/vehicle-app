import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import {
  loadVehicleTypesByBrand,
  loadVehicleTypesByBrandSuccess,
} from '../actions/vehicle-brand.actions';
import { map, switchMap } from 'rxjs';

import { BrandService } from '../../brand/services/brand/brand.service';

@Injectable()
export class VehicleBrandffects {
  private actions$: Actions = inject(Actions);
  private brandService: BrandService = inject(BrandService);

  loadVehicleTypesByBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleTypesByBrand),
      switchMap(action =>
        this.brandService
          .getVehicleTypesByBrand(action.brandId)
          .pipe(
            map(vehicleTypes =>
              loadVehicleTypesByBrandSuccess({ vehicleTypes, brandId: action.brandId }),
            ),
          ),
      ),
    ),
  );
}
