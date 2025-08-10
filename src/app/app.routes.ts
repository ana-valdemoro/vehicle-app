import { routes as ROUTES } from './shared/enums/routes';
import { Routes } from '@angular/router';
import { brandDetailResolver } from './features/brand/components/resolvers/brand-detail.resolver';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.BRANDS, pathMatch: 'full' },
  {
    path: ROUTES.BRANDS,
    loadComponent: () =>
      import('./features/brand/components/brands/brands.component').then(m => m.BrandsComponent),
  },

  {
    path: `${ROUTES.BRANDS}/:id`,
    loadComponent: () =>
      import('./features/brand/components/brand-detail/brand-detail.component').then(
        m => m.BrandDetailComponent,
      ),
    resolve: {
      data: brandDetailResolver,
    },
  },
];
