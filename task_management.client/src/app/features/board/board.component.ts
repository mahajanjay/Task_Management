import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../shared/models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { BoardsService } from '../../services/reusables/boards.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, TaskDetailsComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  boardService = inject(BoardsService);

  selectedTask = this.boardService.selectedTask();

  get connectedDropLists(): string[] {
    return this.boardService.board.columns.map(col => col.id);
  }

  onTaskAdded(task: Partial<Task>) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: task.title || '',
      description: task.description || '',
      status: 'todo',
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      labels: task.labels || [],
      storyPoints: task.storyPoints,
      attachments: task.attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.boardService.board.columns[0].tasks.push(newTask);
  }

  drop(event: CdkDragDrop<Task[]>, colIdx: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Optionally update status
      const task = event.container.data[event.currentIndex];
      task.status = this.boardService.board.columns[colIdx].name.toLowerCase().replace(/ /g, '-');
    }
  }

  openTaskDetails(task: Task) {
    this.boardService.selectTask(task);
  }
  
  closeTaskDetails() {
    this.boardService.selectedTask.set(null);
  }
} 