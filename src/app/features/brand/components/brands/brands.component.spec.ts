import '@testing-library/jest-dom';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { BrandsComponent } from './brands.component';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingHarness } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { VehicleBrand } from '../../interfaces/vehicle-brand';
import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks } from '@angular/common/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { screen } from '@testing-library/angular';
import { selectAllVehicleBrands } from '../../../store/selectors/vehicle-brand.selectors';
import userEvent from '@testing-library/user-event';

@Component({ selector: 'app-mock-brand-detail', template: '' })
class MockBrandDetailComponent {}

describe('BrandsComponent', () => {
  const vehicleBrands: VehicleBrand[] = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
  ];

  const setup = async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        provideRouter([
          {
            path: 'brands',
            component: BrandsComponent,
          },
          {
            path: 'brands/:id',
            component: MockBrandDetailComponent,
          },
        ]),
        provideLocationMocks(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          selectors: [{ selector: selectAllVehicleBrands, value: vehicleBrands }],
        }),
      ],
    });

    const httpCtrl = TestBed.inject(HttpTestingController);
    const user = userEvent.setup();
    const harness = await RouterTestingHarness.create('/brands');
    harness.fixture.autoDetectChanges(true);

    await screen.findByText('Brand list');
    return { httpCtrl, user, harness };
  };

  it('should render input and mat-list', async () => {
    await setup();

    const input = screen.getByRole('textbox', { name: /search brands/i });
    const list = screen.getByTestId('virtual-scroll-brands');

    expect(input).toBeVisible();
    expect(list).toBeVisible();
  });

  it('Should click one list item and navigate to brand detail', async () => {
    const { user } = await setup();
    const location = TestBed.inject(Location);

    const brandItem = await screen.findByText(/brand 1/i);
    await user.click(brandItem);

    expect(location.path()).toBe('/brands/1');
  });

  it('Should filter brands based on search input', async () => {
    const { user, harness } = await setup();
    const searchInput = screen.getByRole('textbox', { name: /search brands/i });

    await user.type(searchInput, 'Brand 2');
    await userEvent.click(document.body);

    harness.detectChanges();

    expect(screen.getByText('Brand 2')).toBeVisible();
    expect(screen.queryByText('Brand 1')).not.toBeInTheDocument();
  });
});
