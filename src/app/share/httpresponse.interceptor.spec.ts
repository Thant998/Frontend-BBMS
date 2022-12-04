import { TestBed } from '@angular/core/testing';

import { HttpresponseInterceptor } from './httpresponse.interceptor';

describe('HttpresponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpresponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpresponseInterceptor = TestBed.inject(HttpresponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
