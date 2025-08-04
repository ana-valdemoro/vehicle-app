import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'brands', pathMatch: 'full' },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brand/components/brands/brands.component').then(m => m.BrandsComponent),
  },
];
