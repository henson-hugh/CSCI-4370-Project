import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  msg: string = '';
  oldPass: string = '';
  newPass: string = '';
  customer: Customer = new Customer();
  user: User = new User();

  constructor(private _service: EditProfileService, private _router: Router) { }

  ngOnInit(): void {
    this._service.getCustomerInfoFromRemote(this.customer).subscribe(
      data => {
        console.log("Response " + data['type']);
        this.user.uid = data['uid'];
        this.customer.cid = data.customer['cid'];
        this.customer.firstName = data.customer['firstName'];
        this.customer.lastName = data.customer['lastName'];
        this.customer.street = data.customer['street'];
        this.customer.city = data.customer['city'];
        this.customer.state = data.customer['state'];
        this.customer.zip = data.customer['zip'];
        this.customer.phone = data.customer['phone'];
        this.customer.getPromo = data.customer['getPromo'];
      }
    )
  }

  updateCustomer() {
    if (this.user.password) {
      console.log(this.user.password)
      this._service.verifyOldPasswordFromRemote(this.user).subscribe(
      data => {
        console.log("verified old password");
        this.user.password = this.newPass;
        this._service.updateUserPasswordFromRemote(this.user).subscribe(
          result => {
            console.log("updated password");
          }
        );
      },
      error => {
        this.msg = 'Current password is incorrect'
      });
    }
    this.updateCustomerDetails();

  }

  updateCustomerDetails() {
    this._service.updateCustomerFromRemote(this.customer).subscribe(
      data => {

        console.log("Response" + data['email']);
        this._router.navigate(['/home']);
      },
      error => {
        this.msg = 'Enter all required fields'
      });
  }
}
