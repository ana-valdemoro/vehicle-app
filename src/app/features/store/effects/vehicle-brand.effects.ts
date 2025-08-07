import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadVehicleBrand, loadVehicleBrandSuccess, loadVehicleModelByBrand, loadVehicleModelByBrandSuccess } from '../actions/vehicle-brand.actions';
import { map, switchMap } from 'rxjs';

import { BrandService } from '../../brand/services/brand/brand.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleBrandffects {
  constructor(
    private actions$: Actions,
    private brandService: BrandService,
  ) {}

  loadCarBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleBrand),
      switchMap(() =>
        this.brandService
          .getAllMakes()
          .pipe(map(vehicleBrands => loadVehicleBrandSuccess({ vehicleBrands }))),
      ),
    ),
  );

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
}
