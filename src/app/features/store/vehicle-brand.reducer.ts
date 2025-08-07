import { createReducer, on } from '@ngrx/store';
import { loadCarBrand, loadCarBrandSuccess } from './car-brand.actions';

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
  on(loadCarBrand, state => ({
    ...state,
    loading: true,
  })),

  on(loadCarBrandSuccess, (state, { carBrands }) => ({
    ...state,
    loading: false,
    vehicleBrands: carBrands,
  })),
);
