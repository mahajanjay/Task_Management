import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { BoardsFactoryComponent } from './pages/boards-factory/boards-factory.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    component: RegisterComponent,
    path: 'register',
    canActivate: [noAuthGuard]
  },
  {
    component: LogInComponent,
    path: 'login',
    canActivate: [noAuthGuard]
  },
  {
    component: MainLayoutComponent,
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: BoardsFactoryComponent }
    ]
  }
];