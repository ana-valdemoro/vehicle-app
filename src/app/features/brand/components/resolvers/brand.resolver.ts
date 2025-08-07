import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadVehicleModelByBrand } from '../../../store/actions/vehicle-brand.actions';
import { of } from 'rxjs';
import { selectModelsByBrand } from '../../../store/selectors/vehicle-brand.selectors';

@Injectable({ providedIn: 'root' })
// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BrandResolver implements Resolve<any> {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const brandId = Number(route.paramMap.get('id'));
    if (isNaN(brandId)) {
      this.router.navigate(['/productos']);
      return of(null);
    }

    // 1. Get models from BE
    this.store.dispatch(loadVehicleModelByBrand({ brandId }));
    // 2. After saving models in store, get them from store
    return this.store.select(selectModelsByBrand(brandId)).pipe(
      filter(brand => !!brand),
      first(),
    );
  }
}
