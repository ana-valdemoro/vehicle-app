import { createAction, props } from '@ngrx/store';

import { VehicleBrand } from '../brand/interfaces/vehicle-brand';

//  ACTIONS IDENTIFIERS
export const LOAD_ACTION = '[Vehicle brand] Load Vehicle Brands';
export const LOAD_SUCCESS_ACTION = '[Vehicle brand] Load Vehicle Brands Success';
export const LOAD_FAILURE_ACTION = '[Vehicle brand] Load Vehicle Brands Failure';

export const loadVehicleBrand = createAction(LOAD_ACTION);
export const loadVehicleBrandSuccess = createAction(
  LOAD_SUCCESS_ACTION,
  props<{ vehicleBrands: VehicleBrand[] }>(),
);
export const loadVehicleBrandFailure = createAction(
  LOAD_FAILURE_ACTION,
  props<{ error: unknown }>(),
);
