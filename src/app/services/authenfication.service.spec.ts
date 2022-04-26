import { TestBed } from '@angular/core/testing';

import { AuthenficationService } from './authenfication.service';

describe('AuthenficationService', () => {
  let service: AuthenficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
