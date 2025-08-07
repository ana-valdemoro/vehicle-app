import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VehicleBrandState } from './vehicle-brand.reducer';

export const selectVehicleBrandState = createFeatureSelector<VehicleBrandState>('carBrand');

export const selectAllVehicleBrands = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.vehicleBrands,
);

export const selectVehicleBrandLoading = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.loading,
);

export const selectVehicleBrandError = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.error,
);
