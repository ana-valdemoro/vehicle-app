import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  changeLoadingVehicleBrand,
  loadVehicleModelByBrandSuccess,
} from '../../../store/actions/vehicle-brand.actions';
import { filter, finalize, switchMap, take, tap } from 'rxjs/operators';

import { BrandService } from '../../services/brand/brand.service';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { routes } from '../../../../shared/enums/routes';
import { selectHasModelsByBrand } from '../../../store/selectors/vehicle-brand.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleModelByBrandResolver implements Resolve<Observable<VehicleModel[]>> {
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
      select(selectHasModelsByBrand(brandId)),
      take(1),
      filter(hasModels => !hasModels),
      tap(() => {
        this.store.dispatch(changeLoadingVehicleBrand({ loading: true }));
      }),
      switchMap(() =>
        this.brandService.getModelsByBrand(brandId).pipe(
          tap(models => {
            this.store.dispatch(loadVehicleModelByBrandSuccess({ models, brandId }));
          }),
          finalize(() => {
            this.store.dispatch(changeLoadingVehicleBrand({ loading: false }));
          }),
        ),
      ),
    );
  }
}
