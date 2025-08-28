import { Component, ElementRef, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsService } from '../../services/reusables/boards.service';
import { BoardComponent } from '../../features/board/board.component';
import { HeaderService } from '../../services/core/header.service';

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
  @ViewChild('customHeaderOptions', { read: TemplateRef }) customHeaderOptions!: TemplateRef<any>;

  boardsService = inject(BoardsService);
  headerService = inject(HeaderService);

  ngAfterViewInit() {
    this.loadBoards();
    //this.headerService.setHeaderButtons([...this.boardsService.boardActionButtons]);
    this.headerService.setCustomHeaderOptions(this.customHeaderOptions);
  }

  loadBoards() {
    this.boardsContainer.clear();

    const boardRef = this.boardsContainer.createComponent(BoardComponent);
  }

  ngOnDestroy() {
    this.headerService.setHeaderButtons([]);
  }
}
