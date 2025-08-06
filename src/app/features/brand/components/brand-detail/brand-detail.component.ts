import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

import { CurrencyPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.css',
})
export class BrandDetailComponent {
  private router: Router = inject(Router);
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

  onNavigateBack(): void {
    this.router.navigate([`/${routes.BRANDS}`]);
  }
}
