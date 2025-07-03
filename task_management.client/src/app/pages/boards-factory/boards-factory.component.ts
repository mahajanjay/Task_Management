import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards-factory',
  imports: [
    CommonModule
  ],
  templateUrl: './boards-factory.component.html',
  styleUrl: './boards-factory.component.scss'
})
export class BoardsFactoryComponent {
  @ViewChild('boardsContainer') boardsContainer!: ElementRef;

  ngAfterViewInit() {

  }
}
