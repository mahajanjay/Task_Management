import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { HeaderService } from '../../../services/core/header.service';
import { THEME } from '../../../shared/constants/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;
  isDarkMode = false;

  public headerService = inject(HeaderService);

  ngOnInit() {
    this.getTheme();
  }

  getTheme() {
    const themeClass = localStorage.getItem(THEME);
    if(themeClass) {
      const root = document.documentElement;      
      if(themeClass == 'tb-dark'){
        this.isDarkMode = true;
        root.classList.add('tb-dark')
      } else {
        this.isDarkMode = false;
        root.classList.remove('tb-dark');
      } 
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.classList.add('tb-dark');
      localStorage.setItem(THEME, 'tb-dark');
    } else {
      root.classList.remove('tb-dark');
      localStorage.removeItem(THEME);
    }
  }
}
