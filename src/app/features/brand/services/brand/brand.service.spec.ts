import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BrandService } from './brand.service';
import { TestBed } from '@angular/core/testing';
import { VpicApiResponse } from '../../interfaces/api-response';
import { VpicMakeDto } from '../../interfaces/vpic-make';
import { VpicModelDto } from '../../interfaces/vpic-model';
import { VpicTypeDto } from '../../interfaces/vpic-type';
import { environment } from '../../../../../environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMocked: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BrandService);
    httpMocked = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all vehicle makes', done => {
    const mockResponse: Partial<VpicApiResponse<VpicMakeDto[]>> = {
      Results: [{ Make_ID: 1, Make_Name: 'Brand 1' }],
    };

    service.getAllMakes().subscribe(vehicleBrand => {
      expect(vehicleBrand.length).toBe(1);
      expect(vehicleBrand[0].name).toBe('Brand 1');
      expect(vehicleBrand[0].id).toBe(1);
      done();
    });
    const req = httpMocked.expectOne(`${environment.baseUrl}/GetAllMakes?format=json`);

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch all vehicle models by brand', done => {
    const mockResponse: Partial<VpicApiResponse<VpicModelDto[]>> = {
      Results: [{ Model_ID: 1, Model_Name: 'Model 1', Make_ID: 1, Make_Name: 'Brand 1' }],
    };

    service.getModelsByBrand(1).subscribe(modelsByBrand => {
      expect(modelsByBrand.length).toBe(1);
      expect(modelsByBrand[0].name).toBe('Model 1');
      expect(modelsByBrand[0].id).toBe(1);
      done();
    });
    const req = httpMocked.expectOne(`${environment.baseUrl}/GetModelsForMakeId/1?format=json`);

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch all vehicle types by brand', done => {
    const mockResponse: Partial<VpicApiResponse<VpicTypeDto[]>> = {
      Results: [{ VehicleTypeId: 1, VehicleTypeName: 'Type 1' }],
    };

    service.getVehicleTypesByBrand(1).subscribe(typesByBrand => {
      expect(typesByBrand.length).toBe(1);
      expect(typesByBrand[0].name).toBe('Type 1');
      expect(typesByBrand[0].id).toBe(1);
      done();
    });
    const req = httpMocked.expectOne(
      `${environment.baseUrl}/GetVehicleTypesForMakeId/1?format=json`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
