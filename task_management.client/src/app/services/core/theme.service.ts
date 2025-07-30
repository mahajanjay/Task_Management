import { Injectable } from '@angular/core';
import { THEME } from '../../shared/constants/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  isDarkMode(): boolean {
      const themeClass = localStorage.getItem(THEME);
      if(themeClass) {
        const root = document.documentElement;      
        if(themeClass == 'tb-dark'){
          root.classList.add('tb-dark')
          return true;
        } else {
          root.classList.remove('tb-dark');
          return false;
        } 
      }

      return false
    }
}
