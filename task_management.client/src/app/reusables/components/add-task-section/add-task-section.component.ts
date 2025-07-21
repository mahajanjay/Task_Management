import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

export interface AddTaskSectionTitle {
  title: string,
  callback?: (title: string) => void,
  type: ContentType,
  defaultContentText: string
}

export interface AddTaskSectionContentItem {
  title: string,
  value: any,
  styles?: { [key: string]: string },
  icon?: string
}

export interface AddTaskSectionContent{
  sectionTitle: AddTaskSectionTitle,
  contentList: AddTaskSectionContentItem[],
}

export type ContentType = 'chip' | 'strip' | 'input';

@Component({
  selector: 'app-add-task-section',
  imports: [
    CommonModule
  ],
  templateUrl: './add-task-section.component.html',
  styleUrl: './add-task-section.component.scss'
})
export class AddTaskSectionComponent {
  @Input() sectionList!: AddTaskSectionContent[];

  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;

}
