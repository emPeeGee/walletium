import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSaveModalComponent } from './account-save-modal.component';

describe('AccountSaveModalComponent', () => {
  let component: AccountSaveModalComponent;
  let fixture: ComponentFixture<AccountSaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSaveModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
