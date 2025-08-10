import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VehicleBrandState } from '../reducers/vehicle-brand.reducer';

export const selectVehicleBrandState = createFeatureSelector<VehicleBrandState>('vehicleBrand');

export const selectAllVehicleBrands = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.vehicleBrands,
);

export const selectVehicleBrandById = (brandId: number) =>
  createSelector(selectAllVehicleBrands, vehicleBrands =>
    vehicleBrands.find(brand => brand.id === brandId),
  );

export const selectVehicleBrandLoading = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.loading,
);

export const selectVehicleBrandError = createSelector(
  selectVehicleBrandState,
  (state: VehicleBrandState) => state.error,
);

export const selectModelsByBrand = (brandId: number) =>
  createSelector(
    selectVehicleBrandState,
    (state: VehicleBrandState) => state.modelsByBrand[brandId],
  );

export const selectTypesByBrand = (brandId: number) =>
  createSelector(
    selectVehicleBrandState,
    (state: VehicleBrandState) => state.vehicleTypesByBrand[brandId],
  );

export const selectModelsAndTypesByBrand = (brandId: number) =>
  createSelector(selectModelsByBrand(brandId), selectTypesByBrand(brandId), (models, types) => ({
    models,
    types,
  }));
