import { Injectable, signal } from '@angular/core';
import { HeaderButtons } from '../../shared/models/core/HeaderButtons';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  headerButtons = signal<HeaderButtons[]>([]);

  setHeaderButtons(list: HeaderButtons[]) {
    this.headerButtons.set(list);
  }

}
