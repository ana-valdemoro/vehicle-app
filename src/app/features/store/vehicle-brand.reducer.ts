import { createReducer, on } from '@ngrx/store';
import { loadVehicleBrand, loadVehicleBrandSuccess } from './car-brand.actions';

import { VehicleBrand } from '../brand/interfaces/vehicle-brand';

export interface VehicleBrandState {
  loading: boolean;
  error: unknown;
  vehicleBrands: VehicleBrand[];
}

export const initialState: VehicleBrandState = {
  loading: false,
  error: null,
  vehicleBrands: [],
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
);
