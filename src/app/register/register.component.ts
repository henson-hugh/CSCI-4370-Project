import { Component, OnInit } from '@angular/core';
import { Customer } from '../login/customer';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  output = '';
  customer: Customer = new Customer();

  constructor(private _service: RegistrationService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerCustomer() {
    this._service.registerCustomerFromRemote(this.customer).subscribe(
      data => {
        console.log("Response" + data);
        this._router.navigate(['/home']);
      }, 
      error => {
        this.output = 'Please fill out all fields'
      })
  }
}
