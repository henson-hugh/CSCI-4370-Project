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

        // check for privilege
        if (data['privilege'] == 'admin') { // send to admin page
          sessionStorage.setItem('privilege', '1');
          this._router.navigate(['/admin-menu']);
        } else { // send to customer page
          if (!data['verified']) { // check verification
            this.msg = 'Account is not active, please verify your email.'
          } else if (data['suspended']){ // check suspension
            this.msg = 'Account has been suspended. Please contact an Admin.'
          } else { // successful customer login
          // set logged in as true and remember cid
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('cid', data['cid']);
          this._router.navigate(['/home']);
          }
        }
        if (this.remember) {
          // Set cookies to remember

        }
      }
    )
  }
}
