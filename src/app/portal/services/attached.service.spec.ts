import { TestBed } from '@angular/core/testing';

import { AttachedService } from './attached.service';

describe('AttachedService', () => {
  let service: AttachedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
