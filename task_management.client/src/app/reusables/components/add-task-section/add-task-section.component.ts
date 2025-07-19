import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface AddTaskSectionTitle {
  title: string,
  callback: (title: string) => void
}

export interface AddTaskSectionContent{
  title: string,
  value: any,
  icon: string
}

export type ContentType = 'chip' | 'strip'

@Component({
  selector: 'app-add-task-section',
  imports: [
    CommonModule
  ],
  templateUrl: './add-task-section.component.html',
  styleUrl: './add-task-section.component.scss'
})
export class AddTaskSectionComponent {
  @Input() title!: AddTaskSectionTitle;
  @Input() contentDefaultText!: string;
  @Input() contentType: ContentType = 'chip';
  @Input() content!: AddTaskSectionContent[]

}
