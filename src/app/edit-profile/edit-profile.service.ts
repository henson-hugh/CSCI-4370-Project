import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../login/customer';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private _http: HttpClient) { }

  public getCustomerInfoFromRemote(customer: Customer): Observable<any> {
    return this._http.get<any>("http://localhost:8080/customers/" + sessionStorage.getItem('cid'));
  }

  public updateCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customers/save", customer);
  }

  public verifyOldPasswordFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customers/verifyPass", customer);
  }
}
