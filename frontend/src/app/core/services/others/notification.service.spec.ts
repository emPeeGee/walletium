import { TestBed } from '@angular/core/testing';

import { NofiticationService } from './notification.service';

describe('SnackBarService', () => {
  let service: NofiticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NofiticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
