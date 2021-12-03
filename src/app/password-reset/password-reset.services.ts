import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private _http: HttpClient) { }

  public resetPasswordFromRemote(user: User): Observable<any> {
    return this._http.post<any>("http://localhost:8080/resetPass", user);
  }

}
