import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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

  constructor(private _formBuilder: FormBuilder, private _service: ManagePromotionsService) { }

  ngOnInit(): void {
    this.promotionForm = this._formBuilder.group({
      discount: '',
      pcode: ''
    });
  }

  submitPromotion() {
    console.log(this.promotionForm.value);
    this.promotion.discount = this.promotionForm.value['discount'];
    this.promotion.pcode = this.promotionForm.value['pcode'];
    
    this._service.addPromotionInfoFromRemote(this.promotion).subscribe(
      data => {
        console.log('promotion saved');
    });
  }
}
