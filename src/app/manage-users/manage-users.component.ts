import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { ManageUsersService } from './manage-users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userForm: FormGroup;
  user: User = new User();
  customer: Customer = new Customer();

  constructor(private _formBuilder: FormBuilder, private _service: ManageUsersService, private _router: Router) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      uid: '',
      email: '',
      fname: '',
      lname: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      active: '',
      verified: '',
      getpromo: ''
    });
  }


  findByUserId() {
    console.log(this.userForm.value);
    this.user.uid = this.userForm.value['uid'];

    this._service.getCustomerInfoFromRemote(this.user.uid).subscribe(
      data => {
        console.log('Got user info');
        this.customer.cid = data.customer['cid'];
        this.customer.suspend = data.customer['suspend'];
        this.userForm.controls.email.setValue(data.user['email']);
        this.userForm.controls.fname.setValue(data.customer['firstName']);
        this.userForm.controls.lname.setValue(data.customer['lastName']);
        this.userForm.controls.phone.setValue(data.customer['phone']);
        this.userForm.controls.street.setValue(data.customer['street']);
        this.userForm.controls.city.setValue(data.customer['city']);
        this.userForm.controls.state.setValue(data.customer['state']);
        this.userForm.controls.zip.setValue(data.customer['zip']);
        this.userForm.controls.active.setValue(data.customer['active']);
        this.userForm.controls.verified.setValue(data.customer['verified']);
        this.userForm.controls.getpromo.setValue(data.customer['getpromo']);
    });
  }

  updateUser() {
    this.user.email = this.userForm.value['email'];
    this.customer.firstName = this.userForm.value['fname'];
    this.customer.lastName = this.userForm.value['lname'];
    this.customer.phone = this.userForm.value['phone'];
    this.customer.street = this.userForm.value['street'];
    this.customer.city = this.userForm.value['city'];
    this.customer.state = this.userForm.value['state'];
    this.customer.zip = this.userForm.value['zip'];
    this.customer.active = this.userForm.value['active'];
    this.customer.verified = this.userForm.value['verified'];
    this.customer.getPromo = this.userForm.value['getpromo'];

    this._service.saveUserInfoFromRemote(this.user).subscribe(
      data => {

      }
    );

    console.log(this.customer);
    this._service.saveCustomerInfoFromRemote(this.customer).subscribe(
      data => {

      }
    );

    }

  suspendUser() {
    if (this.customer.suspend) {
      this._service.unsuspendCustomerFromRemote(this.customer).subscribe(
        data => {
          this._router.navigate(['/admin-menu']);
        }
      );
    } else {
      this._service.suspendCustomerFromRemote(this.customer).subscribe(
        data => {
          this._router.navigate(['/admin-menu']);
        }
      );
    }
  }
}
