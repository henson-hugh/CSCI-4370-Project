import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { HomePageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  loggedIn: string = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  userId: number = 0;
  customer: Customer = new Customer();
  profileName: string = 'Login';
  profileURL: string = 'login';
  registerName: string = 'Register';
  registerURL: string = 'register';
  constructor(private _service: HomePageService, private _router: Router) {}

  async ngOnInit(): Promise<void> {
    if (this.loggedIn.toString() == 'true') {
      this.userId = Number(sessionStorage.getItem('cid')) || 0;
      this.customer.cid = this.userId;
      await this._service.getCustomerInfoFromRemote(this.customer).subscribe(
        data => {
          this.profileName = data['firstName'];
          this.profileURL = "edit-profile";
          this.registerName = "Logout";
          this.registerURL = "logout";
        })
    }
  }

}
