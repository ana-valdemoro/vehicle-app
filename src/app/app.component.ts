import { Component, OnInit, inject } from '@angular/core';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';
import {
  changeLoadingVehicleBrand,
  loadVehicleBrandFailure,
  loadVehicleBrandSuccess,
} from './features/store/actions/vehicle-brand.actions';

import { BrandService } from './features/brand/services/brand/brand.service';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private brandService: BrandService = inject(BrandService);
  title = 'vehicle-app';

  ngOnInit(): void {
    this.store.dispatch(changeLoadingVehicleBrand({ loading: true }));
    this.brandService
      .getAllMakes()
      .pipe(
        tap(makes => {
          this.store.dispatch(loadVehicleBrandSuccess({ vehicleBrands: makes }));
        }),
        catchError(error => {
          this.store.dispatch(loadVehicleBrandFailure({ error }));
          return of();
        }),
        finalize(() => {
          this.store.dispatch(changeLoadingVehicleBrand({ loading: false }));
        }),
      )
      .subscribe();
  }
}
