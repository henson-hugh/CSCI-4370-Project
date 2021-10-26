import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  // authenticate(credentials: any, callback: any) {
  //   const headers = new HttpHeaders(credentials ? {
  //     authorization : 'Basic' + btoa(credentials.username + ':' + credentials.password)
  //   } : {});

  //   this.http.get('login', {headers: headers}).subscribe(response => {
  //     if(response) {
  //       this.authenticated = true;
  //     } else {
  //       this.authenticated = false;
  //     }
  //     return callback && callback();
  //   });
  // }

  public loginCustomerFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/login", customer);
  }

}