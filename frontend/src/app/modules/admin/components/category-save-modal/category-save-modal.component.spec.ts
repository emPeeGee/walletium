import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySaveModalComponent } from './category-save-modal.component';

describe('CategorySaveModalComponent', () => {
  let component: CategorySaveModalComponent;
  let fixture: ComponentFixture<CategorySaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySaveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
