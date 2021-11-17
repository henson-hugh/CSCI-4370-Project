import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetEmailService {

  constructor(private _http: HttpClient) { }

  public sendResetEmailFromRemote(email: string): Observable<any> {
    return this._http.post<any>("http://localhost:8080/forgotPass", email);
  }

}
