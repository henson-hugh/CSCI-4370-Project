import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/model/promotion';

@Injectable({
  providedIn: 'root'
})
export class ManagePromotionsService {

  constructor(private _http: HttpClient) { }

  public addPromotionInfoFromRemote(promotion: Promotion): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/promotion/add", promotion);
  }
}
