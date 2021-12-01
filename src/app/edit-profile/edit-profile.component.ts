import { Component, OnInit } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  msg: string = '';
  customer: Customer = new Customer();
  user: User = new User();

  constructor(private _service: EditProfileService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this._formBuilder.group({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      paymentCards: this._formBuilder.array([]),
      promo: [false, '']
    });
    // this._service.getUserInfoFromRemote(Number(sessionStorage.getItem('cid'))).subscribe(
    //   data => {
    //     this.user.uid = data['uid'];
    //     this.user.password = data['password'];
    //   });
    this._service.getCustomerInfoFromRemote(this.customer).subscribe(
      data => {
        this.customer.cid = data.customer['cid'];

        this.profileForm.controls.firstName.setValue(data.customer['firstName']);
        this.profileForm.controls.lastName.setValue(data.customer['lastName']);
        this.profileForm.controls.street.setValue(data.customer['street']);
        this.profileForm.controls.city.setValue(data.customer['city']);
        this.profileForm.controls.state.setValue(data.customer['state']);
        this.profileForm.controls.zip.setValue(data.customer['zip']);
        this.profileForm.controls.phone.setValue(data.customer['phone']);
      }
    )
  }

  updateCustomer() {
    if (this.profileForm.controls.oldPassword.value != null && this.profileForm.controls.newPassword.value != null) {
      console.log(this.profileForm.controls.oldPassword.value)
      this._service.verifyOldPasswordFromRemote(this.user).subscribe(
      data => {
        console.log("verified old password");
        this.user.password = this.profileForm.controls.newPassword.value;
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
    this.customer.firstName = this.profileForm.controls.firstName.value;
    this.customer.lastName = this.profileForm.controls.lastName.value;
    this.customer.street = this.profileForm.controls.street.value;
    this.customer.city = this.profileForm.controls.city.value;
    this.customer.state = this.profileForm.controls.state.value;
    this.customer.zip = this.profileForm.controls.zip.value;
    this.customer.phone = this.profileForm.controls.phone.value;

    this._service.updateCustomerFromRemote(this.customer).subscribe(
      data => {

        console.log("Response" + data['email']);
        this._router.navigate(['/home']);
      },
      error => {
        this.msg = 'Enter all required fields'
      });
  }

  paymentCards(): FormArray {
    return this.profileForm.get('paymentCards') as FormArray;
  }

  createPaymentCard(): FormGroup {
    return this._formBuilder.group({
      cardNumber: '',
      expDate: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  addPaymentCard(): void {
    this.paymentCards().push(this.createPaymentCard());
  }

  removePaymentCard(i: number) {
    this.paymentCards().removeAt(i);
  }
}
