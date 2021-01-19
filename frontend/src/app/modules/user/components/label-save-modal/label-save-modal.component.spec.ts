import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSaveModalComponent } from './label-save-modal.component';

describe('LabelSaveModalComponent', () => {
  let component: LabelSaveModalComponent;
  let fixture: ComponentFixture<LabelSaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelSaveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
