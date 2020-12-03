import { TestBed } from '@angular/core/testing';

import { AuthenticationAdminGuard } from './authentication-admin.guard';

describe('AuthenticationAdminGuard', () => {
  let guard: AuthenticationAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
