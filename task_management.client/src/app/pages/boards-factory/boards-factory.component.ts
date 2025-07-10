import { Component, ElementRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsService } from '../../services/reusables/boards.service';
import { BoardComponent } from '../../features/board/board.component';

@Component({
  selector: 'app-boards-factory',
  imports: [
    CommonModule
  ],
  templateUrl: './boards-factory.component.html',
  styleUrl: './boards-factory.component.scss'
})
export class BoardsFactoryComponent {
  @ViewChild('boardsContainer', { read: ViewContainerRef }) boardsContainer!: ViewContainerRef;
  boardsService = inject(BoardsService);
  ngAfterViewInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.boardsContainer.clear();

    const boardRef = this.boardsContainer.createComponent(BoardComponent);
  }
}
