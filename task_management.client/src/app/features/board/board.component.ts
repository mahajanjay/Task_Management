import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board, BoardColumn } from '../../shared/board.model';
import { Task } from '../../shared/task.model';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, AddTaskComponent, TaskDetailsComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board: Board = {
    id: '1',
    name: 'My Board',
    columns: [
      { id: 'todo', name: 'To Do', tasks: [] },
      { id: 'in-progress', name: 'In Progress', tasks: [] },
      { id: 'done', name: 'Done', tasks: [] }
    ]
  };

  selectedTask: Task | null = null;

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
    this.board.columns[0].tasks.push(newTask);
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
      task.status = this.board.columns[colIdx].name.toLowerCase().replace(/ /g, '-');
    }
  }

  openTaskDetails(task: Task) {
    this.selectedTask = { ...task };
  }

  closeTaskDetails() {
    this.selectedTask = null;
  }

  saveTaskDetails(updatedTask: Task) {
    // Find and update the task in the board
    for (const col of this.board.columns) {
      const idx = col.tasks.findIndex(t => t.id === updatedTask.id);
      if (idx !== -1) {
        col.tasks[idx] = updatedTask;
        break;
      }
    }
    this.selectedTask = null;
  }
} 