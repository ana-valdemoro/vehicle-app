import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrandService } from '../../services/brand/brand.service';
import { CarBrand } from '../../interfaces/car-brand';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';

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
  brands$: Observable<CarBrand[]>;

  constructor(private brandService: BrandService) {
    this.brands$ = this.brandService.getAllMakes();
  }
}
