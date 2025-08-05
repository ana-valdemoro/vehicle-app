import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CarBrandState } from './carb-brand.reducer';

export const selectCarBrandState = createFeatureSelector<CarBrandState>('carBrand');

export const selectAllCarBrands = createSelector(
  selectCarBrandState,
  (state: CarBrandState) => state.carBrands,
);

export const selectCarBrandLoading = createSelector(
  selectCarBrandState,
  (state: CarBrandState) => state.loading,
);

export const selectCarBrandError = createSelector(
  selectCarBrandState,
  (state: CarBrandState) => state.error,
);
