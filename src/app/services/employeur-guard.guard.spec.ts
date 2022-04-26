import { TestBed } from '@angular/core/testing';

import { EmployeurGuard } from './employeur-guard.guard';

describe('UserTypeGuardGuard', () => {
  let guard: EmployeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
