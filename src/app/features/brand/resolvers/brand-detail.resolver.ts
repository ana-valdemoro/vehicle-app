import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import {
  changeLoadingVehicleBrand,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrandSuccess,
} from '../../store/actions/vehicle-brand.actions';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { BrandService } from '../services/brand/brand.service';
import { Store } from '@ngrx/store';
import { VehicleModel } from '../interfaces/vehicle-model';
import { VehicleType } from '../interfaces/vehicle-type';
import { inject } from '@angular/core';
import { routes } from '../../../shared/enums/routes';
import { selectModelsAndTypesByBrand } from '../../store/selectors/vehicle-brand.selectors';

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

  return store.select(selectModelsAndTypesByBrand(brandId)).pipe(
    take(1),
    switchMap(({ models, types }) => {
      if (models && types) {
        return of({ models, types });
      }

      store.dispatch(changeLoadingVehicleBrand({ loading: true }));

      const models$ = models
        ? of(models)
        : brandService
            .getModelsByBrand(brandId)
            .pipe(
              tap(models => store.dispatch(loadVehicleModelByBrandSuccess({ models, brandId }))),
            );

      const types$ = types
        ? of(types)
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
