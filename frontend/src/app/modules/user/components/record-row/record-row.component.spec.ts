import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRowComponent } from './record-row.component';

describe('RecordCardComponent', () => {
  let component: RecordRowComponent;
  let fixture: ComponentFixture<RecordRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordRowComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
