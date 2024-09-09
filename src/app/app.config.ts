import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyDigugEnxxJdrrmY8WjK4MFJ-QJR7fE3mI",
        authDomain: "fluid-1f156.firebaseapp.com",
        projectId: "fluid-1f156",
        storageBucket: "fluid-1f156.appspot.com",
        messagingSenderId: "633954875674",
        appId: "1:633954875674:web:7db8d7ad2ae0d659ebd4a3",
        measurementId: "G-PQC14GKLS2"        })
    ),
    provideMessaging(() => getMessaging()),
    
    
    { provide: FIREBASE_OPTIONS, useValue: {
      apiKey: "AIzaSyDigugEnxxJdrrmY8WjK4MFJ-QJR7fE3mI",
      authDomain: "fluid-1f156.firebaseapp.com",
      projectId: "fluid-1f156",
      storageBucket: "fluid-1f156.appspot.com",
      messagingSenderId: "633954875674",
      appId: "1:633954875674:web:7db8d7ad2ae0d659ebd4a3",
      measurementId: "G-PQC14GKLS2",
        vapidKey:"BAV8-r3HKGt-e7-3kJhJRyAD_zb5HnQlfxY-CxiUSw4tgwUUPnvDRSE8ps-m_6Mbt0E-na1uZ7p-ESlq9Z6_klw"
      } }, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ],
};