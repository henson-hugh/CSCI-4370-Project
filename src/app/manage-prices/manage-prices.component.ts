import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageUsersService } from '../manage-users/manage-users.service';
import { Price } from '../model/price';
import { ManagePricesService } from './manage-prices.service';

@Component({
  selector: 'app-manage-prices',
  templateUrl: './manage-prices.component.html',
  styleUrls: ['./manage-prices.component.scss']
})
export class ManagePricesComponent implements OnInit {
  priceForm: FormGroup;
  price: Price = new Price();

  constructor(private _formBuilder: FormBuilder, private _service: ManagePricesService, private _router: Router) { }

  ngOnInit(): void {

    this.priceForm = this._formBuilder.group({
      childprice: '',
      adultprice: '',
      seniorprice: '',
      fee: ''
    });
  }

  changePrices() {
    this.price.aticket = this.priceForm.value['adultprice'];
    this.price.cticket = this.priceForm.value['childprice'];
    this.price.sticket = this.priceForm.value['seniorprice'];
    this.price.fee = this.priceForm.value['fee'];

    console.log(this.price)
    this._service.changePriceFromRemote(this.price).subscribe(
      data => {
        this._router.navigate(['/admin-menu']);
      }
    );

  }

}
