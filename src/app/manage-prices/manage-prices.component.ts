import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageUsersService } from '../manage-users/manage-users.service';

@Component({
  selector: 'app-manage-prices',
  templateUrl: './manage-prices.component.html',
  styleUrls: ['./manage-prices.component.scss']
})
export class ManagePricesComponent implements OnInit {
  priceForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _service: ManageUsersService, private _router: Router) { }

  ngOnInit(): void {
    
    this.priceForm = this._formBuilder.group({
      childprice: '',
      adultprice: '',
      seniorprice: '',
      fee: ''
    });
  }

  changePrices() {

  }

}
