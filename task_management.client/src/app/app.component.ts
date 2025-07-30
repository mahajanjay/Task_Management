import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from './services/core/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor() {}

  title = 'task_management.client';

  private themeService = inject(ThemeService);

  ngOnInit() { 
    this.themeService.isDarkMode();
  }

    

}
