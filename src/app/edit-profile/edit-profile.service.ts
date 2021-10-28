import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../login/customer';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private _http: HttpClient) { }

  headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "http://localhost:8080"});
  options = { headers: this.headers };

  public getCustomerInfoFromRemote(customer: Customer): Observable<any> {
    return this._http.get<any>("http://localhost:8080/customers/" + 28);
  }

  public updateCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customers/save", customer);
  }

  public verifyOldPasswordFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customers/verifyPass", customer);
  }
}
