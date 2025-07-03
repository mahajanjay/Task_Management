import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsFactoryComponent } from './boards-factory.component';

describe('BoardsFactoryComponent', () => {
  let component: BoardsFactoryComponent;
  let fixture: ComponentFixture<BoardsFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
