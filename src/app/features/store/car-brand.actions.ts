import { createAction, props } from '@ngrx/store';

import { VehicleBrand } from '../brand/interfaces/vehicle-brand';

//  ACTIONS IDENTIFIERS
export const LOAD_ACTION = '[Car brand] Load Car Brands';
export const LOAD_SUCCESS_ACTION = '[Car brand] Load Car Brands Success';
export const LOAD_FAILURE_ACTION = '[Car brand] Load Car Brands Failure';

export const loadCarBrand = createAction(LOAD_ACTION);
export const loadCarBrandSuccess = createAction(
  LOAD_SUCCESS_ACTION,
  props<{ carBrands: VehicleBrand[] }>(),
);
export const loadCarBrandFailure = createAction(LOAD_FAILURE_ACTION, props<{ error: unknown }>());
