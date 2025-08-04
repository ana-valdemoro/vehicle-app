import { CarBrand } from '../../interfaces/car-brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MakeList } from '../../interfaces/make';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllMakes(): Observable<CarBrand[]> {
    const url = `${environment.baseUrl}/GetAllMakes?format=json`;
    return this.http.get<MakeList>(url).pipe(map(
      (response) => response.Results.map((make) => ({
        id: make.Make_ID,
        name: make.Make_Name,
      }))
    ));
  }
}
