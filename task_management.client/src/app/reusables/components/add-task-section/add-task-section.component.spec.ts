import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskSectionComponent } from './add-task-section.component';

describe('AddTaskSectionComponent', () => {
  let component: AddTaskSectionComponent;
  let fixture: ComponentFixture<AddTaskSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
