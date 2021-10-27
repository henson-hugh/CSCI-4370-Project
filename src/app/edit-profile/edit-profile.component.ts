import { Component, OnInit } from '@angular/core';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';
import { Customer } from '../login/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  msg: string = '';
  customer: Customer = new Customer();

  constructor(private _service: EditProfileService, private _router: Router) { }

  ngOnInit(): void {
      this._service.getCustomerInfoFromRemote(this.customer).subscribe(
        data => {
          console.log("Response " + data['type']);
        }
      )
  }

  updateCustomer() {
    this._service.updateCustomerFromRemote(this.customer).subscribe(
      data => {
        console.log("Response" + data['email']);
        this._router.navigate(['/home']);
      }, 
      error => {
        this.msg = 'Enter all required fields'
      });
    }
}
