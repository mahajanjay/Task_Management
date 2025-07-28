import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Task } from '../../shared/models/task.model';
import { pattern, REGEX } from '../../shared/utils/validator';
import { Priority } from '../../shared/constants/board';
import {
  AddTaskSectionComponent,
  AddTaskSectionContent,
} from '../../reusables/components/add-task-section/add-task-section.component';
import { hexToRGBA } from '../../shared/utils/board';
import { AddTaskContentComponent, TaskContentData } from '../../reusables/components/add-task-content/add-task-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    AddTaskSectionComponent,
    AddTaskContentComponent
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<Partial<Task>>();

  form: FormGroup;
  priority = Priority;

  taskMetaDataList: AddTaskSectionContent[] = [
    {
      sectionTitle: {
        title: 'Assignees',
        type: 'strip',
        defaultContentText: 'No one',
      },
      contentList: [
        { title: 'Ganpati Bappa', value: 'Ganpati Bappa' },
        { title: 'Maa Durga', value: 'Maa Durga' },
      ],
    },
    {
      sectionTitle: {
        title: 'Labels',
        type: 'chip',
        defaultContentText: 'No labels',
      },
      contentList: [
        {
          title: 'Urgent',
          value: 'Urgent',
          styles: {
            'background-color': hexToRGBA('#ffeb3b', 0.08),
            color: '#ffeb3b',
            border: '1px solid #ffeb3b',
          },
        },
        {
          title: 'Bug',
          value: 'Bug',
          styles: {
            'background-color': hexToRGBA('#ECA1A8', 0.08),
            color: '#ECA1A8',
            border: '1px solid #ECA1A8',
          },
        },
      ],
    },
    {
      sectionTitle: {
        title: 'Estimate',
        type: 'input',
        defaultContentText: 'No estimate',
      },
      contentList: [{ title: '', value: 0 }],
    },
  ];

  taskContentData: TaskContentData = {
    description: 'Ganpati Bappa Morya',
  };

  private dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, pattern(REGEX.ALLOW_ALPHA_NUMERIC)]],
      description: [''],
      priority: [''],
      assignee: [''],
      dueDate: [''],
      labels: [''],
      storyPoints: [''],
      attachments: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const task: Partial<Task> = {
      ...value,
      labels: value.labels
        ? value.labels
            .split(',')
            .map((l: string) => l.trim())
            .filter((l: string) => l)
        : [],
      attachments: value.attachments
        ? value.attachments
            .split(',')
            .map((a: string) => a.trim())
            .filter((a: string) => a)
        : [],
      storyPoints: value.storyPoints ? Number(value.storyPoints) : undefined,
    };
    this.taskAdded.emit(task);
    this.form.reset();
  }

  // ...existing code...
  onSectionChanged(sectionState: any) {
    // sectionState contains selected items and input values for each section
    console.log(sectionState);
    // You can process or store this data as needed
  }

  onContentChanged(contentData: TaskContentData) {
    this.taskContentData = contentData;
    console.log('Content changed:', contentData);
  }
  
  onCancel() {
    this.form.reset();
    this.dialog.closeAll();
  }
}
