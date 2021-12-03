import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AddAdminService {

  constructor(private _http: HttpClient) { }

  public saveUserInfoFromRemote(user: User): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/admin/create/", user);
  }
}
