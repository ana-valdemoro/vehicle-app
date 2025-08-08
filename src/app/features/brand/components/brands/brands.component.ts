import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Observable, combineLatest, map, startWith } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { routes } from '../../../../shared/enums/routes';
import { selectAllVehicleBrands } from '../../../store/selectors/vehicle-brand.selectors';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    CdkVirtualScrollViewport,
    ScrollingModule,
    MatLabel,
    MatFormField,
    MatInputModule,
    MatListModule,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private store = inject(Store);
  private router: Router = inject(Router);
  allBrands$: Observable<VehicleBrand[]> = this.store.select(selectAllVehicleBrands);
  searchControl = new FormControl('');
  brands$ = combineLatest([
    this.allBrands$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([brands, search]) =>
      brands.filter(brand => {
        if (search === null || search === undefined || search.trim() === '') {
          return true;
        }

        return brand.name.toLowerCase().includes(search.toLowerCase());
      }),
    ),
  );

  onSelectBrand(brand: VehicleBrand): void {
    this.router.navigate([`/${routes.BRANDS}`, brand.id]);
  }
}
