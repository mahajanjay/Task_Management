import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

interface BtnOpenForm {
  label: string;
  onClick: () => void;
}

@Component({
  selector: 'app-master-page-layout',
  imports: [
    CommonModule
  ],
  templateUrl: './master-page-layout.component.html',
  styleUrl: './master-page-layout.component.scss'
})
export class MasterPageLayoutComponent {
  @Input() title: string = '';
  @Input() openFormBtn: BtnOpenForm | null = null;
}
