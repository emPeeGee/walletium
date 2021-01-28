import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowComponent } from './snow.component';

describe('SnowComponent', () => {
  let component: SnowComponent;
  let fixture: ComponentFixture<SnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
