import { createReducer, on } from '@ngrx/store';
import { loadCarBrand, loadCarBrandSuccess } from './car-brand.actions';

import { CarBrand } from '../brand/interfaces/car-brand';

export interface CarBrandState {
  loading: boolean;
  error: unknown;
  carBrands: CarBrand[];
}

export const initialState: CarBrandState = {
  loading: false,
  error: null,
  carBrands: [],
};

export const carBrandReducer = createReducer(
  initialState,
  on(loadCarBrand, state => ({
    ...state,
    loading: true,
  })),

  on(loadCarBrandSuccess, (state, { carBrands }) => ({
    ...state,
    loading: false,
    carBrands: carBrands,
  })),
);
