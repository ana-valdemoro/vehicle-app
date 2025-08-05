import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarBrand } from '../../interfaces/car-brand';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllCarBrands } from '../../../store/car-brand.selectors';

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
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private store = inject(Store);
  brands$: Observable<CarBrand[]> = this.store.select(selectAllCarBrands);

  // constructor(private brandService: BrandService) {
  //   this.brands$ = this.brandService.getAllMakes();
  // }
}
