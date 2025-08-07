import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { selectModelsByBrand, selectVehicleBrandById } from '../../../store/selectors/vehicle-brand.selectors';

import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { routes } from '../../../../shared/enums/routes';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.css',
})
export class BrandDetailComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  brandId!: string;
  models: VehicleModel[] = [];
  brand: VehicleBrand | undefined;

  constructor() {
    this.route.params.subscribe(params => {
      this.brandId = params['id'];
    });
  }

  ngOnInit(): void {
    this.store.select(selectVehicleBrandById(Number(this.brandId))).subscribe(brand => {
      this.brand = brand;
    });

    this.store.select(selectModelsByBrand(Number(this.brandId))).subscribe(models => {
      if (models) {
        this.models = models;
      }
    });
  }

  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
