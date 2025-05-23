import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Updated import for animations
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import for HttpClient

import { routes } from './app.routes';

// Import Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // Added for potential use in dashboard/lists
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(), // Correct way to provide animations
    provideHttpClient(withFetch()), // Provide HttpClient with fetch support
    importProvidersFrom([ // Import Material modules and ReactiveFormsModule
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      ReactiveFormsModule // Add ReactiveFormsModule here
    ])
  ]
};
