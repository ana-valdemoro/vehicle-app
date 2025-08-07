import { createAction, props } from '@ngrx/store';

import { VehicleBrand } from '../../brand/interfaces/vehicle-brand';
import { VehicleModel } from '../../brand/interfaces/vehicle-model';

//  ACTIONS IDENTIFIERS
export const LOAD_ACTION = '[Vehicle brand] Load Vehicle Brands';
export const LOAD_SUCCESS_ACTION = '[Vehicle brand] Load Vehicle Brands Success';
export const LOAD_FAILURE_ACTION = '[Vehicle brand] Load Vehicle Brands Failure';

export const LOAD_MODEL_BY_BRAND = '[Vehicle brand] Load Vehicle Model By Brand';
export const LOAD_MODEL_BY_BRAND_SUCCESS = '[Vehicle brand] Load Vehicle Model By Brand Success';
export const LOAD_MODEL_BY_BRAND_FAILURE = '[Vehicle brand] Load Vehicle Model By Brand Failure';

export const loadVehicleBrand = createAction(LOAD_ACTION);
export const loadVehicleBrandSuccess = createAction(
  LOAD_SUCCESS_ACTION,
  props<{ vehicleBrands: VehicleBrand[] }>(),
);
export const loadVehicleBrandFailure = createAction(
  LOAD_FAILURE_ACTION,
  props<{ error: unknown }>(),
);

export const loadVehicleModelByBrand = createAction(
  LOAD_MODEL_BY_BRAND,
  props<{ brandId: number }>(),
);
export const loadVehicleModelByBrandSuccess = createAction(
  LOAD_MODEL_BY_BRAND_SUCCESS,
  props<{ models: VehicleModel[]; brandId: number }>(),
);
