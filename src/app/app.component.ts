import { Component, OnInit, inject } from '@angular/core';

import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadVehicleBrand } from './features/store/vehicle-brand.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  title = 'vehicle-app';

  ngOnInit(): void {
    this.store.dispatch(loadVehicleBrand());
  }
}
