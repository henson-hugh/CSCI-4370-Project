import { TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';


describe('PasswordResetService', () => {
  let service: PasswordResetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
