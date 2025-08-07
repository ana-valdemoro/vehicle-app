import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { map } from 'rxjs';
import { routes } from '../../../../shared/enums/routes';
import {
selectVehicleBrandById,
} from '../../../store/selectors/vehicle-brand.selectors';

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

    this.route.data.pipe(map(data => data['models'] as VehicleModel[])).subscribe(models => {
      this.models = models;
    });
  }

  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
