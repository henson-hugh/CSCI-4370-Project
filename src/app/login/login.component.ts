import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Customer } from '../model/customer';
import { User } from '../model/user';

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
  user: User = new User();
  resultType = '';
  active = false;
  msg = '';

  constructor(private _service: LoginService, private _router: Router) { 
  }

  ngOnInit(): void {
    if (localStorage.getItem('mail') != "") {
      this.user.email = localStorage.getItem('mail') || "";
      localStorage.removeItem('mail');
      this.remember = true;
    }
  }

  async login() {
    await this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("Response active: " + data['active']);
        this.resultType = data['type'];
        this.active = data['active'];
      }
    )
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        if (this.resultType == 'admin') {
          this._router.navigate(['/admin-menu']);
        } else {
          if (this.active) {
            this._router.navigate(['/home']);
          } else {
            this.msg = 'Account is not active, please verify your email'
          }
        }
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('cid', data['cid']);
        if (this.remember) {
          localStorage.setItem('mail', this.user.email);
        }
      }, 
      error => {
        this.msg = 'Invalid credentials, incorrect email and/or password'
      })
  }
}
