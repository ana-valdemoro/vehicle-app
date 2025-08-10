import {
  changeLoadingVehicleBrand,
  loadVehicleBrandFailure,
  loadVehicleBrandSuccess,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrandSuccess,
} from '../actions/vehicle-brand.actions';
import { createReducer, on } from '@ngrx/store';

import { VehicleBrand } from '../../brand/interfaces/vehicle-brand';
import { VehicleModel } from '../../brand/interfaces/vehicle-model';
import { VehicleType } from '../../brand/interfaces/vehicle-type';

export interface VehicleBrandState {
  loading: boolean;
  error: unknown | null;
  vehicleBrands: VehicleBrand[];
  modelsByBrand: { [brandId: number]: VehicleModel[] };
  vehicleTypesByBrand: { [brandId: number]: VehicleType[] };
}

export const initialState: VehicleBrandState = {
  loading: false,
  error: null,
  vehicleBrands: [],
  modelsByBrand: {},
  vehicleTypesByBrand: {},
};

export const vehicleBrandReducer = createReducer(
  initialState,

  on(loadVehicleBrandSuccess, (state, { vehicleBrands }) => ({
    ...state,
    vehicleBrands,
  })),
  on(loadVehicleBrandFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(changeLoadingVehicleBrand, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(loadVehicleModelByBrandSuccess, (state, { models, brandId }) => ({
    ...state,
    modelsByBrand: {
      ...state.modelsByBrand,
      [brandId]: models,
    },
  })),
  on(loadVehicleTypesByBrandSuccess, (state, { vehicleTypes, brandId }) => ({
    ...state,
    vehicleTypesByBrand: {
      ...state.vehicleTypesByBrand,
      [brandId]: vehicleTypes,
    },
  })),
);
