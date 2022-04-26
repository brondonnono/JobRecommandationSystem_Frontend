import { TestBed } from '@angular/core/testing';

import { EmployeGuard } from './employe-guard.guard';

describe('UserTypeGuardGuard', () => {
  let guard: EmployeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
