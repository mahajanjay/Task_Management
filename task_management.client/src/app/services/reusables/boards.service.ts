import { Injectable, signal } from '@angular/core';
import { Board } from '../../shared/models/board.model';
import { Task } from '../../shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../../features/task-details/task-details.component';
import { HeaderButtons } from '../../shared/models/core/HeaderButtons';
import { AddTaskComponent } from '../../features/add-task/add-task.component';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private dialog: MatDialog) {}

  board: Board = {
    id: '1',
    name: 'My Board',
    columns: [
      {
        id: 'todo',
        name: 'To Do',
        tasks: [
          {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            status: 'todo',
            priority: 'Medium',
            assignee: 'John Doe',
            dueDate: '2025-01-01',
            labels: ['bug', 'feature'],
            storyPoints: 1,
            attachments: ['https://example.com/attachment1.jpg'],
          },
          {
            id: '2',
            title: 'Task 2',
            description: 'Description 2',
            status: 'todo',
            priority: 'High',
            assignee: 'Jane Smith',
            dueDate: '2025-01-02',
            labels: ['feature'],
            storyPoints: 2,
            attachments: ['https://example.com/attachment2.jpg'],
          },
        ],
      },
      { id: 'in-progress', name: 'In Progress', tasks: [] },
      { id: 'done', name: 'Done', tasks: [] },
    ],
  };

  boardActionButtons: HeaderButtons[] = [
    {
      title: 'Add',
      classList: 'gh-btn-primary',
      callback: () => this.openAddTask()
    }
  ]

  selectedTask = signal<Task | null>(null);

  saveTaskDetails(updatedTask: Task) {
    // Find and update the task in the board
    for (const col of this.board.columns) {
      const idx = col.tasks.findIndex((t: Task) => t.id === updatedTask.id);
      if (idx !== -1) {
        col.tasks[idx] = updatedTask;
        break;
      }
    }
    this.selectedTask.set(null);
  }

  selectTask(task: Task) {
    this.selectedTask.set(task);
    this.openTaskDetails(task);
  }

  openTaskDetails(task: Task) {
    this.dialog.open(TaskDetailsComponent, {
      data: task,
      height: '90%',
      maxWidth: '700px'
    });
  }

  openAddTask() {
    this.dialog.open(AddTaskComponent, {
      width: '90vw',
      maxWidth: '900px',
    })
  }
}
