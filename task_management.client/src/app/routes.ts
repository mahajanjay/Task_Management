// src/app/routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { BoardsFactoryComponent } from './pages/boards-factory/boards-factory.component';

export const routes: Routes = [
  {
    component: MainLayoutComponent,
    path: '',
    children: [
      { path: '', component: BoardsFactoryComponent }
    ]
  }
];