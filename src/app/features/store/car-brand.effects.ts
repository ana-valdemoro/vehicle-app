import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadCarBrand, loadCarBrandSuccess } from './car-brand.actions';
import { map, switchMap } from 'rxjs';

import { BrandService } from '../brand/services/brand/brand.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CarBrandffects {
  constructor(
    private actions$: Actions,
    private carBrandService: BrandService,
  ) {}

  loadCarBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCarBrand),
      switchMap(() =>
        this.carBrandService
          .getAllMakes()
          .pipe(map(carBrands => loadCarBrandSuccess({ carBrands }))),
      ),
    ),
  );
}
