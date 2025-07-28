import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface TaskContentData {
  description: string;
}

@Component({
  selector: 'app-add-task-content',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-task-content.component.html',
  styleUrl: './add-task-content.component.scss'
})
export class AddTaskContentComponent {

  @Input() taskContentData: TaskContentData | null = null;
  @Output() contentChanged = new EventEmitter<TaskContentData>();

  taskContentForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.declareForm();
    this.onTaskContentChanges();
  }

  ngAfterViewInit() {
    if (this.taskContentData) {
      this.taskContentForm.patchValue(this.taskContentData);
    }
  }

  declareForm() {
    this.taskContentForm = this.fb.group({
      description: ['']
    });
  }

  onTaskContentChanges() {
    this.taskContentForm.valueChanges.subscribe({
      next: () => {
        const contentData: TaskContentData = {
          description: this.taskContentForm.value.description || ''
        };
        this.contentChanged.emit(contentData);
      }
    })
  }

}
