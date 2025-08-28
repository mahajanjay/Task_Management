import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { RouterModule } from '@angular/router';
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
 
  ngAfterViewInit() {
    this.headerService.setCustomHeaderOptions(null);
  }
}
