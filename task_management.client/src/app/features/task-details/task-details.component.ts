import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Task, Comment } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Task>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;
  showSubtaskForm = false;
  showCommentForm = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
      assignee: [''],
      dueDate: [''],
      labels: [''],
      storyPoints: [''],
      attachments: [''],
      subtasks: this.fb.array([]),
      comments: this.fb.array([])
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.form.patchValue({
        ...this.task,
        labels: this.task.labels?.join(', ') || '',
        attachments: this.task.attachments?.join(', ') || ''
      });
      this.setFormArray('subtasks', this.task.subtasks || []);
      this.setFormArray('comments', this.task.comments || []);
    }
  }

  setFormArray(key: 'subtasks' | 'comments', items: any[]) {
    const arr = this.form.get(key) as FormArray;
    arr.clear();
    items.forEach(item => arr.push(this.fb.group(item)));
  }

  get subtasks() { return this.form.get('subtasks') as FormArray; }
  get comments() { return this.form.get('comments') as FormArray; }

  addSubtask() {
    this.subtasks.push(this.fb.group({
      id: Date.now().toString(),
      title: [''],
      status: ['todo']
    }));
    this.showSubtaskForm = false;
  }

  addComment(author: string, content: string) {
    this.comments.push(this.fb.group({
      id: Date.now().toString(),
      author,
      content,
      createdAt: new Date().toISOString()
    }));
    this.showCommentForm = false;
  }

  onSave() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const updatedTask: Task = {
      ...this.task!,
      ...value,
      labels: value.labels ? value.labels.split(',').map((l: string) => l.trim()).filter((l: string) => l) : [],
      attachments: value.attachments ? value.attachments.split(',').map((a: string) => a.trim()).filter((a: string) => a) : [],
      subtasks: value.subtasks,
      comments: value.comments,
      updatedAt: new Date().toISOString()
    };
    this.save.emit(updatedTask);
  }

  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
} 