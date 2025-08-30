import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPageLayoutComponent } from './master-page-layout.component';

describe('MasterPageLayoutComponent', () => {
  let component: MasterPageLayoutComponent;
  let fixture: ComponentFixture<MasterPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
