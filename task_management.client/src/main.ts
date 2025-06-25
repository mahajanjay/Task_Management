import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});