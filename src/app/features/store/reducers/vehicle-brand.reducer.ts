import {
  changeLoadingVehicleBrand,
  loadVehicleBrandFailure,
  loadVehicleBrandSuccess,
  loadVehicleModelByBrand,
  loadVehicleModelByBrandSuccess,
  loadVehicleTypesByBrand,
  loadVehicleTypesByBrandSuccess,
} from '../actions/vehicle-brand.actions';
import { createReducer, on } from '@ngrx/store';

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
