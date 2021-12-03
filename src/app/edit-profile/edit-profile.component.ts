import { Component, OnInit } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { FormBuilder, FormGroup, FormArray, Validator, Validators, MaxLengthValidator } from '@angular/forms';
import { PaymentCard } from '../model/payment-card';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  msg: string = 'Passwords must be at least 8 characters in length';
  customer: Customer = new Customer();
  user: User = new User();
  paymentCardList: PaymentCard[] = [];

  constructor(private _service: EditProfileService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this._formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.min(8)])],
      newPassword: ['', Validators.min(8)],
      confirmPassword: ['', Validators.min(8)],
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      paymentCards: this._formBuilder.array([], [Validators.maxLength(3)]),
      promo: false
    });

    this._service.getCustomerInfoFromRemote(this.customer).subscribe(
      data => {
        this.customer.cid = data.customer['cid'];
        this.user.uid = data.customer['userid'];

        this.profileForm.controls.firstName.setValue(data.customer['firstName']);
        this.profileForm.controls.lastName.setValue(data.customer['lastName']);
        this.profileForm.controls.street.setValue(data.customer['street']);
        this.profileForm.controls.city.setValue(data.customer['city']);
        this.profileForm.controls.state.setValue(data.customer['state']);
        this.profileForm.controls.zip.setValue(data.customer['zip']);
        this.profileForm.controls.phone.setValue(data.customer['phone']);
        this.profileForm.controls.promo.setValue(data.customer['getPromo']);

        this._service.getPaymentCardInfoFromRemote(this.customer).subscribe(
          cardData => {
            cardData.forEach((element: any) =>{

              var d = new Date(element['expDate']);

              this.paymentCards().push(this._formBuilder.group({
                cardNumber: element['cardNumber'],
                expDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + d.getTimezoneOffset()).toISOString(),
                street: element['street'],
                city: element['city'],
                state: element['street'],
                zip: element['zip']
              }));
            });
          });
      });
  };

  updateCustomer() {
    if (this.profileForm.controls.oldPassword.value) {
      this.user.password = this.profileForm.controls.oldPassword.value;
      this._service.verifyOldPasswordFromRemote(this.user).subscribe(
        data => {
          this.updateCustomerDetails(); // updates other information first when password is verified

          if (this.profileForm.controls.oldPassword.value && this.profileForm.controls.newPassword.value) { // checks if password needs to change
            if (this.profileForm.controls.newPassword.value == this.profileForm.controls.confirmPassword.value) { // checks if new password and confirm password entered correctly
              this.user.password = this.profileForm.controls.newPassword.value;
              this._service.updateUserPasswordFromRemote(this.user).subscribe(
                result => {
                  console.log("updated password");
                });
            } else {
              this.msg = 'Please confirm your new password correctly.'
            }
          }
          this._router.navigate(['/home']);
        },
        error => {
          this.msg = 'Current password is incorrect';
        });
    }
  }

  updateCustomerDetails() {
    this.customer.firstName = this.profileForm.controls.firstName.value;
    this.customer.lastName = this.profileForm.controls.lastName.value;
    this.customer.street = this.profileForm.controls.street.value;
    this.customer.city = this.profileForm.controls.city.value;
    this.customer.state = this.profileForm.controls.state.value;
    this.customer.zip = this.profileForm.controls.zip.value;
    this.customer.phone = this.profileForm.controls.phone.value;
    this.customer.getPromo = this.profileForm.controls.promo.value;
    this.paymentCardList = this.profileForm.value['paymentCards'];
    this.paymentCardList.forEach(card => {
      card.customerid = this.customer.cid;
    });

    this._service.updateCustomerFromRemote(this.customer).subscribe(
      data => {
        console.log("Customer updated");
      },
      error => {
        this.msg = 'Enter all required fields'
      });

    // add payment card to database
    this.paymentCardList.forEach(card => {
      this._service.updatePaymentCardInfoFromRemote(card).subscribe(
        data =>{
          console.log('payment card saved');
        }
      )
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
