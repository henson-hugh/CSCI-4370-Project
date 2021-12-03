import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../model/price';

@Injectable({
  providedIn: 'root'
})
export class ManagePricesService {

  constructor(private _http: HttpClient) { }

  public changePriceFromRemote(price: Price): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/price/edit", price);
  }
}
