import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddModalComponent } from './account-add-modal.component';

describe('AccountAddModalComponent', () => {
  let component: AccountAddModalComponent;
  let fixture: ComponentFixture<AccountAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
