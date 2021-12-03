import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Promotion } from 'src/app/model/promotion';
import { ManagePromotionsService } from './manage-promotions.service';

@Component({
  selector: 'app-manage-promotions',
  templateUrl: './manage-promotions.component.html',
  styleUrls: ['./manage-promotions.component.scss']
})
export class ManagePromotionsComponent implements OnInit {
  promotionForm: FormGroup;
  promotion: Promotion = new Promotion();

  constructor(private _formBuilder: FormBuilder, private _service: ManagePromotionsService, private _router: Router) { }

  ngOnInit(): void {
    this.promotionForm = this._formBuilder.group({
      discount: '',
      pcode: '',
      startDate: '',
      endDate: '',
      promoDescription: ''
    });
  }

  submitPromotion() {
    console.log(this.promotionForm.value);
    this.promotion.discount = this.promotionForm.value['discount'];
    this.promotion.pcode = this.promotionForm.value['pcode'];
    this.promotion.startDate = this.promotionForm.value['startDate'];
    this.promotion.endDate = this.promotionForm.value['endDate'];
    this.promotion.description = this.promotionForm.value['promoDescription'];

    this._service.addPromotionInfoFromRemote(this.promotion).subscribe(
      data => {
        console.log('promotion saved');
        this._router.navigate(['/admin-menu']);
    });
  }
}
