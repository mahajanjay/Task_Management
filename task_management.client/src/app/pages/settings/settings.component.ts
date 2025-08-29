import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../services/core/header.service';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    RouterModule,

    HeaderComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  headerService = inject(HeaderService);
  private router = inject(Router);

  sideMenuOptions = [
    {
      label: 'Teams',
      iconClassList: 'icon material-symbols-outlined',
      icon: 'groups',
      action: () => console.log('Teams clicked'),
      routerLink: '/settings/teams'
    },
    {
      label: 'Users',
      iconClassList: 'icon material-symbols-outlined',
      icon: 'person_2',
      action: () => console.log('Users clicked'),
      routerLink: '/settings/users'
    },
    {
      label: 'Roles',
      iconClassList: 'icon material-symbols-outlined',
      icon: 'assignment_ind',
      action: () => console.log('Teams clicked'),
      routerLink: '/settings/roles'
    },
  ]
 
  ngAfterViewInit() {
    this.headerService.setCustomHeaderOptions(null);
  }
}
