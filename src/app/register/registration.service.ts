import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentCard } from '../model/payment-card';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  public saveCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customer/register", customer);
  }

  public registerUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>("http://localhost:8080/register", user);
  }

  public savePaymentCardFromRemote(paymentCard: PaymentCard): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customer/payment/add", paymentCard)
  }
}