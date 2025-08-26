import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { HeaderService } from '../../../services/core/header.service';
import { THEME } from '../../../shared/constants/core';
import { ThemeService } from '../../../services/core/theme.service';
import { LoggedInUserService } from '../../../services/core/logged-in-user.service';

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
  public themeService = inject(ThemeService);
  public loggedInUserService = inject(LoggedInUserService);

  ngOnInit() {
    this.isDarkMode = this.themeService.isDarkMode();
    console.log(this.loggedInUserService.getLoggedInUser());
    
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
