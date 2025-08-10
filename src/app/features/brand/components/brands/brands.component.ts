import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Observable, map } from 'rxjs';

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
  styleUrl: './brands.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsComponent {
  private store = inject(Store);
  private router = inject(Router);
  allBrands$: Observable<VehicleBrand[]> = this.store.select(selectAllVehicleBrands);
  searchTerm: string = '';
  brands$: Observable<VehicleBrand[]> = this.filterBrands();

  onSelectBrand(brand: VehicleBrand): void {
    this.router.navigate([`/${routes.BRANDS}`, brand.id]);
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.brands$ = this.filterBrands();
  }

  filterBrands() {
    return this.allBrands$.pipe(
      map(brands =>
        brands.filter(brand => {
          if (
            this.searchTerm === null ||
            this.searchTerm === undefined ||
            this.searchTerm.trim() === ''
          ) {
            return true;
          }

          return brand.name.toLowerCase().includes(this.searchTerm);
        }),
      ),
    );
  }
}
