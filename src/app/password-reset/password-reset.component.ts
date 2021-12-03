import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from './password-reset.services';
import { Customer } from '../model/customer';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  newPass: string = "";
  customer: Customer = new Customer();
  user: User = new User();


  constructor(private _service: PasswordResetService, private _router: Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.user.password = this.newPass;
    this.user.uid = parseInt(localStorage.getItem('resetid') || "0");
    this._service.resetPasswordFromRemote(this.user).subscribe(
      data => {
        console.log("Response active: " + data['active']);
        localStorage.removeItem('resetid');
        this._router.navigate(['/password-reset-confirm']);
      }
    )
  }

}
