import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customer: Customer = new Customer();
  resultType = '';
  msg = '';

  constructor(private _service: LoginService, private _router: Router) { 
  }

  async login() {
    await this._service.getCustomerInfoFromRemote(this.customer).subscribe(
      data => {
        console.log("Response " + data['type']);
        this.resultType = data['type'];
      }
    )
    this._service.loginCustomerFromRemote(this.customer).subscribe(
      data => {
        if (this.resultType == 'admin') {
          this._router.navigate(['/admin-menu']);
        } else {
          this._router.navigate(['/home']);
        }
      }, 
      error => {
        this.msg = 'Invalid credentials, incorrect email and/or password'
      })
  }

  ngOnInit(): void {
  }

}
