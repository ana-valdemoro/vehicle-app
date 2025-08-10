import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  changeLoadingVehicleBrand,
  loadVehicleTypesByBrandSuccess,
} from '../../../store/actions/vehicle-brand.actions';
import { filter, finalize, switchMap, take, tap } from 'rxjs/operators';

import { BrandService } from '../../services/brand/brand.service';
import { VehicleType } from '../../interfaces/vehicle-type';
import { of } from 'rxjs';
import { routes } from '../../../../shared/enums/routes';
import { selectHasTypesByBrand } from '../../../store/selectors/vehicle-brand.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleTypeByBrandResolver implements Resolve<VehicleType[]> {
  private store = inject(Store);
  private router = inject(Router);
  private brandService = inject(BrandService);

  resolve(route: ActivatedRouteSnapshot) {
    const brandId = Number(route.paramMap.get('id'));
    if (isNaN(brandId)) {
      this.router.navigate([`/${routes.BRANDS}`]);
      return of([]);
    }

    return this.store.pipe(
      select(selectHasTypesByBrand(brandId)),
      take(1),
      filter(hasTypes => !hasTypes),
      tap(() => {
        this.store.dispatch(changeLoadingVehicleBrand({ loading: true }));
      }),
      switchMap(() =>
        this.brandService.getModelsByBrand(brandId).pipe(
          tap(vehicleTypes => {
            this.store.dispatch(loadVehicleTypesByBrandSuccess({ vehicleTypes, brandId }));
          }),
          finalize(() => {
            this.store.dispatch(changeLoadingVehicleBrand({ loading: false }));
          }),
        ),
      ),
    );
  }
}
