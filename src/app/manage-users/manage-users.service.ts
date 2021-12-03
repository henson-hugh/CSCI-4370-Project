import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private _http: HttpClient) { }

  public getCustomerInfoFromRemote(uid: number): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/customer/get/" + uid, '');
  }

  public saveUserInfoFromRemote(user: User): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/user/edit/", user);
  }

  public saveCustomerInfoFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/customer/save/", customer);
  }
}
