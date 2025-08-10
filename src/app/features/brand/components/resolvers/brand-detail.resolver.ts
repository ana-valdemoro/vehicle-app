import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  changeLoadingVehicleBrand,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrandSuccess,
} from '../../../store/actions/vehicle-brand.actions';
import { combineLatest, forkJoin, of } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import {
  selectHasModelsByBrand,
  selectHasTypesByBrand,
  selectModelsByBrand,
  selectTypesByBrand,
} from '../../../store/selectors/vehicle-brand.selectors';

import { BrandService } from '../../services/brand/brand.service';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { VehicleType } from '../../interfaces/vehicle-type';
import { inject } from '@angular/core';
import { routes } from '../../../../shared/enums/routes';

export const brandDetailResolver: ResolveFn<{
  models: VehicleModel[];
  types: VehicleType[];
}> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const store = inject(Store);
  const brandService = inject(BrandService);

  const brandId = Number(route.paramMap.get('id'));
  if (isNaN(brandId)) {
    router.navigate([`/${routes.BRANDS}`]);
    return of({ models: [], types: [] });
  }

  return combineLatest([
    store.pipe(select(selectHasModelsByBrand(brandId)), take(1)),
    store.pipe(select(selectHasTypesByBrand(brandId)), take(1)),
    store.pipe(select(selectModelsByBrand(brandId)), take(1)),
    store.pipe(select(selectTypesByBrand(brandId)), take(1)),
  ]).pipe(
    switchMap(([hasModels, hasTypes, existingModels, existingTypes]) => {
      if (hasModels && hasTypes) {
        return of({ models: existingModels, types: existingTypes });
      }

      store.dispatch(changeLoadingVehicleBrand({ loading: true }));

      const models$ = hasModels
        ? of(existingModels)
        : brandService
            .getModelsByBrand(brandId)
            .pipe(
              tap(models => store.dispatch(loadVehicleModelByBrandSuccess({ models, brandId }))),
            );

      const types$ = hasTypes
        ? of(existingTypes)
        : brandService
            .getVehicleTypesByBrand(brandId)
            .pipe(
              tap(vehicleTypes =>
                store.dispatch(loadVehicleTypesByBrandSuccess({ vehicleTypes, brandId })),
              ),
            );

      return forkJoin({ models: models$, types: types$ }).pipe(
        finalize(() => {
          store.dispatch(changeLoadingVehicleBrand({ loading: false }));
        }),
      );
    }),
  );
};
