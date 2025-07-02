// src/app/routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { BoardComponent } from './features/board/board.component';

export const routes: Routes = [
  {
    component: MainLayoutComponent,
    path: '',
    children: [
      { path: '', component: BoardComponent }
    ]
  }
];