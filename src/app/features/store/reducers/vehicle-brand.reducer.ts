import { createReducer, on } from '@ngrx/store';
import {
  loadVehicleBrand,
  loadVehicleBrandSuccess,
  loadVehicleModelByBrand,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrand,
  loadVehicleTypesByBrandSuccess,
} from '../actions/vehicle-brand.actions';

import { VehicleBrand } from '../../brand/interfaces/vehicle-brand';
import { VehicleModel } from '../../brand/interfaces/vehicle-model';
import { VehicleType } from '../../brand/interfaces/vehicle-type';

export interface VehicleBrandState {
  loading: boolean;
  error: unknown;
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
  on(loadVehicleBrand, state => ({
    ...state,
    loading: true,
  })),

  on(loadVehicleBrandSuccess, (state, { vehicleBrands }) => ({
    ...state,
    loading: false,
    vehicleBrands,
  })),
  on(loadVehicleModelByBrand, state => ({
    ...state,
    loading: true,
  })),
  on(loadVehicleModelByBrandSuccess, (state, { models, brandId }) => ({
    ...state,
    loading: false,
    modelsByBrand: {
      ...state.modelsByBrand,
      [brandId]: models,
    },
  })),
  on(loadVehicleTypesByBrand, state => ({
    ...state,
    loading: true,
  })),
  on(loadVehicleTypesByBrandSuccess, (state, { vehicleTypes, brandId }) => ({
    ...state,
    loading: false,
    vehicleTypesByBrand: {
      ...state.vehicleTypesByBrand,
      [brandId]: vehicleTypes,
    },
  })),
);
