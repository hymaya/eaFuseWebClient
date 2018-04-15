import { TestBed, inject } from '@angular/core/testing';

import { LoginModalService } from './login.service';

describe('LoginModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginModalService]
    });
  });

  it('should be created', inject([LoginModalService], (service: LoginModalService) => {
    expect(service).toBeTruthy();
  }));
});
