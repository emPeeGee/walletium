import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsLayoutComponent } from './labels-layout.component';

describe('LabelsLayoutComponent', () => {
  let component: LabelsLayoutComponent;
  let fixture: ComponentFixture<LabelsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
