import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLayoutComponent } from './categories-layout.component';

describe('CategoriesLayoutComponent', () => {
  let component: CategoriesLayoutComponent;
  let fixture: ComponentFixture<CategoriesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
