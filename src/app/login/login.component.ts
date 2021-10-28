import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  customer: Customer = new Customer();
  resultType = '';
  msg = '';

  constructor(private _service: LoginService, private _router: Router) { 
  }

  ngOnInit(): void {
    if (localStorage.getItem('mail') != "") {
      this.customer.email = localStorage.getItem('mail') || "";
      localStorage.removeItem('mail');
      this.remember = true;
    }
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
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('cid', data['cid']);
        if (this.remember) {
          localStorage.setItem('mail', this.customer.email);
        }
      }, 
      error => {
        this.msg = 'Invalid credentials, incorrect email and/or password'
      })
  }
}
