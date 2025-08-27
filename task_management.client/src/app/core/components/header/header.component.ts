import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, signal } from '@angular/core';
import { HeaderService } from '../../../services/core/header.service';
import { THEME } from '../../../shared/constants/core';
import { ThemeService } from '../../../services/core/theme.service';
import { LoggedInUserService } from '../../../services/core/logged-in-user.service';
import { AuthService } from '../../../services/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode = false;
  isUserMenuOpen = signal<boolean>(false);

  userMenuList: any[] = [
    {
      label: 'Logout',
      iconClassList: 'icon material-symbols-outlined',
      icon: 'logout',
      action: () => this.logout(),
    },
    {
      label: 'Settings',
      iconClassList: 'icon material-symbols-outlined',
      icon: 'settings',
      action: () => this.router.navigate(['/settings']),
    }
  ]
  
  public headerService = inject(HeaderService);
  public themeService = inject(ThemeService);
  public loggedInUserService = inject(LoggedInUserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  get getLoggedInUserName() {
    const user = this.loggedInUserService.getLoggedInUser();
    return user ? user.name : 'Guest';
  }

  get getNameAbbrivation() {
    const user = this.loggedInUserService.getLoggedInUser();
    if (user && user.name) {
      return user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    }
    return '';
  }

  toggleUserProfileMenu() {
    this.isUserMenuOpen.set(!this.isUserMenuOpen());
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

  openUserMunu(event: Event) {
    event.preventDefault();
    console.log('User menu clicked');
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.tb-header__avatar') &&
      !target.closest('.user-menu')
    ) {
      this.isUserMenuOpen.set(false);
    }
  }
}
