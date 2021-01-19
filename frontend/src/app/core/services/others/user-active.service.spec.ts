import { TestBed } from '@angular/core/testing';

import { UserActiveService } from './user-active.service';

describe('UserActiveService', () => {
  let service: UserActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
