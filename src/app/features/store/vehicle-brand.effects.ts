import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadVehicleBrand, loadVehicleBrandSuccess } from './car-brand.actions';
import { map, switchMap } from 'rxjs';

import { BrandService } from '../brand/services/brand/brand.service';
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
}
