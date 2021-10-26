import { Injectable } from '@angular/core';
import { Customer } from '../login/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  public registerCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/register", customer);
  }

}