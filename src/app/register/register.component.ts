import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Customer } from '../login/customer';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  msg = '';
  output = '';
  customer: Customer = new Customer();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _service: RegistrationService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  registerCustomer() {
    this._service.registerCustomerFromRemote(this.customer).subscribe(
      data => {
        console.log("Response" + data);
        this._router.navigate(['/confirm-email']);
      }, 
      error => {
        this.msg = 'Account with email already exists'
      });
  }
}
