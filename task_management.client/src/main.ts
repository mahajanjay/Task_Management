import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { inject, provideAppInitializer } from '@angular/core';
import { LoggedInUserService } from './app/services/core/logged-in-user.service';
import { getLocalStorage } from './app/shared/utils/storage';
import { TOKEN } from './app/shared/constants/core';

const storeLoggedInUserFactory = () => {
  const loggedInUserService = inject(LoggedInUserService);
  const token = getLocalStorage(TOKEN);
  if (token) {
    loggedInUserService.setLoggedInUser(token);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(storeLoggedInUserFactory),
  ],
});
