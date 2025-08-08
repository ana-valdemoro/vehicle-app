import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Subscription, combineLatest, map } from 'rxjs';

import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { VehicleModel } from '../../interfaces/vehicle-model';
import { VehicleType } from '../../interfaces/vehicle-type';
import { routes } from '../../../../shared/enums/routes';
import { selectVehicleBrandById } from '../../../store/selectors/vehicle-brand.selectors';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandDetailComponent implements OnInit, OnDestroy {
  brandId!: string;
  models: VehicleModel[] = [];
  types: VehicleType[] = [];
  brand: VehicleBrand | undefined;
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  private subscriptions = new Subscription();

  constructor() {
    this.route.params.subscribe(({ id }) => {
      this.brandId = id;
    });
  }

  ngOnInit(): void {
    const brand$ = this.store.select(selectVehicleBrandById(Number(this.brandId)));
    const models$ = this.route.data.pipe(map(({ models }) => models as VehicleModel[]));
    const types$ = this.route.data.pipe(map(({ types }) => types as VehicleType[]));

    this.subscriptions.add(
      combineLatest([brand$, models$, types$]).subscribe(([brand, models, types]) => {
        this.brand = brand;
        this.models = models;
        this.types = types;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
