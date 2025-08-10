import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import {
  loadVehicleModelByBrand,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrand,
  loadVehicleTypesByBrandSuccess,
} from '../actions/vehicle-brand.actions';
import { map, switchMap } from 'rxjs';

import { BrandService } from '../../brand/services/brand/brand.service';

@Injectable()
export class VehicleBrandffects {
  private actions$: Actions = inject(Actions);
  private brandService: BrandService = inject(BrandService);

  loadnVehicleModelByBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleModelByBrand),
      switchMap(action =>
        this.brandService
          .getModelsByBrand(action.brandId)
          .pipe(map(models => loadVehicleModelByBrandSuccess({ models, brandId: action.brandId }))),
      ),
    ),
  );

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
