import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this._http.get<any>("http://localhost:8080/customers/" + customer.id);
  }

  public updateCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customers/name/", customer.lastName + "+" + customer.firstName, this.options);
  }
}
