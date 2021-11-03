import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from './password-reset.services';
import { Customer } from '../login/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  newPass: string = "";
  customer: Customer = new Customer();


  constructor(private _service: PasswordResetService, private _router: Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.customer.password = this.newPass;
    this.customer.cid = parseInt(localStorage.getItem('resetid') || "0");
    this._service.resetPasswordFromRemote(this.customer).subscribe(
      data => {
        console.log("Response active: " + data['active']);
        localStorage.removeItem('resetid');
        this._router.navigate(['/password-reset-confirm']);
      }
    )
  }

}
