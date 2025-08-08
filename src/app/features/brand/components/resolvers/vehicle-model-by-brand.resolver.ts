import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

import { VehicleModel } from '../../interfaces/vehicle-model';
import { loadVehicleModelByBrand } from '../../../store/actions/vehicle-brand.actions';
import { of } from 'rxjs';
import { routes } from '../../../../shared/enums/routes';
import { selectModelsByBrand } from '../../../store/selectors/vehicle-brand.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleModelByBrandResolver implements Resolve<VehicleModel[]> {
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  resolve(route: ActivatedRouteSnapshot) {
    const brandId = Number(route.paramMap.get('id'));
    if (isNaN(brandId)) {
      this.router.navigate([`/${routes.BRANDS}`]);
      return of([]);
    }
    return this.store.pipe(
      // 1) Lee una vez el estado actual para estos modelos
      select(selectModelsByBrand(brandId)),
      take(1),

      // 2) Si no hay nada, dispara la acción
      tap(models => {
        if (!models || models.length === 0) {
          this.store.dispatch(loadVehicleModelByBrand({ brandId }));
        }
      }),

      // 3) Ahora espera hasta que el selector emita un valor "true-ish"
      switchMap(() =>
        this.store.pipe(
          select(selectModelsByBrand(brandId)),
          filter(models => models && models.length > 0),
          first(),
        ),
      ),
    );
  }
}
