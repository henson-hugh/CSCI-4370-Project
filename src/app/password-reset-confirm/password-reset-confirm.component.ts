import { Component, OnInit } from '@angular/core';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { PasswordResetConfirmService } from './password-reset-confirm.services';
import { Customer } from '../login/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {

  newPass: string = "";
  customer: Customer = new Customer();
  

  constructor(private _service: PasswordResetConfirmService, private _router: Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.customer.password = this.newPass;
    this.customer.cid = parseInt(localStorage.getItem('resetid') || "0");
    this._service.resetPasswordFromRemote(this.customer).subscribe(
      data => {
        console.log("Response active: " + data['active']);
        localStorage.removeItem('resetid');
        this._router.navigate(['/home']);
      }
    )
  }

}
