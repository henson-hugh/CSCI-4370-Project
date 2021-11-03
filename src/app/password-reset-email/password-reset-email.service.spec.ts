import { TestBed } from '@angular/core/testing';

import { PasswordResetEmailComponent } from './password-reset-email.component';


describe('PasswordResetEmailService', () => {
  let service: PasswordResetEmailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetEmailComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
