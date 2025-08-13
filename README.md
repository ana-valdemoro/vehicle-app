# VehicleApp


This is an Angular Single Page Application that displays vehicle information using the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api).

Features include:  
- Virtual scroll for a smooth browsing experience of vehicle brands.  
- Search functionality to filter brands.  
- Detailed view per brand showing vehicle types and available models.

The app uses dynamic routing and async API calls to deliver up-to-date data efficiently.


## Stack
  
• Angular 17  
• NgRx  
• Angular Material  
• Rxjs  
• Angular-testing-library  
• Jest  
• Jest-dom  

## Setup guide

1. Clone this respository with the command: `git clone https://github.com/ana-valdemoro/vehicle-app.git`
2. From the command line, install all project dependencies with: `npm i`
3. Start the application with  `npm run start`

## Test

It only has been posible to add a few tests to `BrandsComponent` and  `BrandService`

Run tests from the command line with:  `npm run test`.


## Future improvements

• Add more tests for other components (e.g., `BrandDetailComponent`), store, reducers, and the `AppComponent`.  
• Creation of a isolated module for the brands feature  
• Authentication


