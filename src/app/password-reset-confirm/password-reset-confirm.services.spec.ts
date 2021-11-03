import { TestBed } from '@angular/core/testing';
import { PasswordResetConfirmComponent } from './password-reset-confirm.component';



describe('PasswordResetService', () => {
  let service: PasswordResetConfirmComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetConfirmComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
