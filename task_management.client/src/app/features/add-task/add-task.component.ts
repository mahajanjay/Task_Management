import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<Partial<Task>>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
      assignee: [''],
      dueDate: [''],
      labels: [''],
      storyPoints: [''],
      attachments: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const task: Partial<Task> = {
      ...value,
      labels: value.labels ? value.labels.split(',').map((l: string) => l.trim()).filter((l: string) => l) : [],
      attachments: value.attachments ? value.attachments.split(',').map((a: string) => a.trim()).filter((a: string) => a) : [],
      storyPoints: value.storyPoints ? Number(value.storyPoints) : undefined
    };
    this.taskAdded.emit(task);
    this.form.reset();
  }
} 