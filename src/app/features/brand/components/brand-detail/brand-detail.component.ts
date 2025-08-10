import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Observable, Subscription, map } from 'rxjs';

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
    AsyncPipe,
  ],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandDetailComponent implements OnInit {
  brandId!: string;
  models$!: Observable<VehicleModel[]>;
  types$!: Observable<VehicleType[]>;
  brand$!: Observable<VehicleBrand | undefined>;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private subscriptions = new Subscription();

  constructor() {
    this.route.params.subscribe(({ id }) => {
      this.brandId = id;
    });
  }

  ngOnInit(): void {
    this.brand$ = this.store.select(selectVehicleBrandById(Number(this.brandId)));
    this.models$ = this.route.data.pipe(map(({ models }) => models as VehicleModel[]));
    this.types$ = this.route.data.pipe(map(({ types }) => types as VehicleType[]));
  }

  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
