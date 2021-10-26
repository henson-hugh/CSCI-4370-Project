import { Component, OnInit } from '@angular/core';
import { Customer } from '../login/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer();

  constructor() { }

  ngOnInit(): void {
  }

  registerCustomer() {
    
  }
}
