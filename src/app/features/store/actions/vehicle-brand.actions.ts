import { createAction, props } from '@ngrx/store';

import { VehicleBrand } from '../../brand/interfaces/vehicle-brand';
import { VehicleModel } from '../../brand/interfaces/vehicle-model';
import { VehicleType } from '../../brand/interfaces/vehicle-type';

//  ACTIONS IDENTIFIERS
export const CHANGE_LOADING_VEHICLE_BRAND_ACTION = '[Vehicle brand] Change Loading Vehicle Brand';
export const LOAD_BRANDS_SUCCESS_ACTION = '[Vehicle brand] Load Vehicle Brands Success';
export const LOAD_BRANDS_FAILURE_ACTION = '[Vehicle brand] Load Vehicle Brands Failure';

export const LOAD_MODEL_BY_BRAND_SUCCESS = '[Vehicle brand] Load Vehicle Model By Brand Success';

export const LOAD_VEHICLE_TYPES_BY_BRAND_SUCCESS =
  '[Vehicle brand] Load Vehicle Types By Brand Success';

//  ACTIONS CREATORS
export const loadVehicleBrandSuccess = createAction(
  LOAD_BRANDS_SUCCESS_ACTION,
  props<{ vehicleBrands: VehicleBrand[] }>(),
);
export const loadVehicleBrandFailure = createAction(
  LOAD_BRANDS_FAILURE_ACTION,
  props<{ error: unknown }>(),
);
export const changeLoadingVehicleBrand = createAction(
  CHANGE_LOADING_VEHICLE_BRAND_ACTION,
  props<{ loading: boolean }>(),
);

export const loadVehicleModelByBrandSuccess = createAction(
  LOAD_MODEL_BY_BRAND_SUCCESS,
  props<{ models: VehicleModel[]; brandId: number }>(),
);

export const loadVehicleTypesByBrandSuccess = createAction(
  LOAD_VEHICLE_TYPES_BY_BRAND_SUCCESS,
  props<{ vehicleTypes: VehicleType[]; brandId: number }>(),
);
