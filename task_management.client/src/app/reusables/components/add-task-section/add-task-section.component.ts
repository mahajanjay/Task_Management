import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';

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
  icon?: string,
  selected?: boolean // Add selected property for selection
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
  @Output() sectionChanged = new EventEmitter<any>();

  @ViewChild('contentTemplateChip', { static: true }) contentTemplateChip!: TemplateRef<any>;
  @ViewChild('contentTemplateStrip', { static: true }) contentTemplateStrip!: TemplateRef<any>;
  @ViewChild('contentTemplateInput', { static: true }) contentTemplateInput!: TemplateRef<any>;
  onSelect(sectionIndex: number, contentIndex: number) {
    const section = this.sectionList[sectionIndex];
    const item = section.contentList[contentIndex];
    item.selected = !item.selected;
    this.emitSectionState();
  }

  onInputChange(sectionIndex: number, contentIndex: number, event: any) {    
    this.sectionList[sectionIndex].contentList[contentIndex].value = event.target.value;
    this.emitSectionState();
  }

  emitSectionState() {
    const result = this.sectionList.map(section => ({
      title: section.sectionTitle.title,
      type: section.sectionTitle.type,
      selectedItems: section.contentList.filter(item => item.selected),
      inputValues: section.contentList
        .filter(item => section.sectionTitle.type === 'input')
        .map(item => item.value)
    }));
    this.sectionChanged.emit(result);
  }

}
