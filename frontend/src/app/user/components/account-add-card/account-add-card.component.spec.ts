import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddCardComponent } from './account-add-card.component';

describe('AccountAddCardComponent', () => {
  let component: AccountAddCardComponent;
  let fixture: ComponentFixture<AccountAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
