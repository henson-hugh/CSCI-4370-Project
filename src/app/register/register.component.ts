import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Customer } from '../model/customer';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  customer: Customer = new Customer();
  user: User = new User();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _service: RegistrationService, private _router: Router, private _formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.firstFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.compose([Validators.required, Validators.email])],
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      confirmPasswordCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      streetCtrl: [''],
      cityCtrl: [''],
      stateCtrl: [''],
      zipCtrl: [''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      cardNumberCtrl: [''],
      expDateCtrl: [''],
    });
  }

  registerCustomer() {
    this.setUserValues();

    console.log(this.firstFormGroup.value['emailCtrl']);
    console.log(this.firstFormGroup.value['firstNameCtrl']);
    console.log(this.firstFormGroup.value['lastNameCtrl']);
    console.log(this.firstFormGroup.value['passwordCtrl']);
    console.log(this.firstFormGroup.value['confirmPasswordCtrl']);
    
    
    this._service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log('User' + data);

        this.customer.userid = data['uid'];
        this.setCustomerValues();
        this._service.saveCustomerFromRemote(this.customer).subscribe(
          result => {
            console.log('Customer' + result);
          }
        )

        this._router.navigate(['/confirm-email']);
        
      }, 
      error => {
        console.log('Error with registering user.');
      });
  }

  setUserValues() {
    this.user.email = this.firstFormGroup.value['emailCtrl'];
    this.user.password = this.firstFormGroup.value['passwordCtrl'];
  }

  setCustomerValues() {
    this.customer.firstName = this.firstFormGroup.value['firstNameCtrl'];
    this.customer.lastName = this.firstFormGroup.value['lastNameCtrl'];
    this.customer.street = this.firstFormGroup.value['streetCtrl'];
    this.customer.city = this.secondFormGroup.value['cityCtrl'];
    this.customer.state = this.firstFormGroup.value['stateCtrl'];
    this.customer.zip = this.firstFormGroup.value['zipCtrl'];
  }
}
