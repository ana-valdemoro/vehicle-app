import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { VehicleType } from '../../interfaces/vehicle-type';
import { loadVehicleTypesByBrand } from '../../../store/actions/vehicle-brand.actions';
import { of } from 'rxjs';
import { routes } from '../../../../shared/enums/routes';
import { selectTypesByBrand } from '../../../store/selectors/vehicle-brand.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleTypeByBrandResolver implements Resolve<VehicleType[]> {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const brandId = Number(route.paramMap.get('id'));
    if (isNaN(brandId)) {
      this.router.navigate([`/${routes.BRANDS}`]);
      return of([]);
    }
    return this.store.pipe(
      select(selectTypesByBrand(brandId)),
      take(1),
      tap(types => {
        if (!types || types.length === 0) {
          this.store.dispatch(loadVehicleTypesByBrand({ brandId }));
        }
      }),
      switchMap(() =>
        this.store.pipe(
          select(selectTypesByBrand(brandId)),
          filter(types => types && types.length > 0),
          first(),
        ),
      ),
    );
  }
}
