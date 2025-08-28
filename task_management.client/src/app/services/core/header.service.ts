import { Injectable, signal, TemplateRef } from '@angular/core';
import { HeaderButtons } from '../../shared/models/core/HeaderButtons';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  headerButtons = signal<HeaderButtons[]>([]);

  customHeaderOptions = signal<TemplateRef<any> | null>(null);
  

  setHeaderButtons(list: HeaderButtons[]) {
    this.headerButtons.set(list);
  }

  setCustomHeaderOptions(template: TemplateRef<any> | null) {
    this.customHeaderOptions.set(template);
  }

}
