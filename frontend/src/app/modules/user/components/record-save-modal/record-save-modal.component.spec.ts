import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSaveModalComponent } from './record-save-modal.component';

describe('RecordSaveModalComponent', () => {
  let component: RecordSaveModalComponent;
  let fixture: ComponentFixture<RecordSaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSaveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
