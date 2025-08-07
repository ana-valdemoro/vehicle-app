import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
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
export class BrandDetailComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  brandId: string | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.brandId = params['id'];
    });
  }

  vehicleCategories = [
    {
      type: 'Sedan',
      models: [
        { name: 'Camry', year: 2024, price: 25000 },
        { name: 'Corolla', year: 2024, price: 22000 },
        { name: 'Avalon', year: 2024, price: 36000 },
      ],
    },
  ];

  // TODO 1: extrac paremeter from router url
  // TODO 2: get brand details from store
  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
