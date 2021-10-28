import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
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
  oldPass: string = '';
  newPass: string = '';
  customer: Customer = new Customer();

  constructor(private _service: EditProfileService, private _router: Router) { }

  ngOnInit(): void {
    this._service.getCustomerInfoFromRemote(this.customer).subscribe(
      data => {
        console.log("Response " + data['type']);
        this.customer.cid = data['cid'];
        this.customer.firstName = data['firstName'];
        this.customer.lastName = data['lastName'];
        this.customer.street = data['street'];
        this.customer.city = data['city'];
        this.customer.state = data['state'];
        this.customer.zip = data['zip'];
        this.customer.paymentCard = data['paymentCard'];
        this.customer.expDate = data['expDate'];
        this.customer.getPromo = data['getPromo'];
      }
    )
  }

  updateCustomer() {
    let verified = false;
    if (this.customer.password != '') {
      this._service.verifyOldPasswordFromRemote(this.customer).subscribe(
      data => {
        verified = true;
      },
      error => {
        this.msg = 'Current password is incorrect'
      });
    }

    if (verified) {
      this.customer.password = this.newPass;
    }

    this._service.updateCustomerFromRemote(this.customer).subscribe(
      data => {
        
        console.log("Response" + data['email']);
        this._router.navigate(['/home']);
      },
      error => {
        this.msg = 'Enter all required fields'
      });

    
  }

  updateTest() {
    
  }
}
