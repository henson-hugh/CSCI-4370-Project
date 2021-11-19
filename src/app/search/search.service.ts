import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    constructor(private _http: HttpClient) { }

    public getCustomerInfoFromRemote(customer: Customer): Observable<any> {
    return this._http.get<any>("http://localhost:8080/customer/" + sessionStorage.getItem('cid'));
  }

  public getMovieInfoFromRemote(filter: string, search: string): Observable<any> {
    return this._http.post<any>("http://localhost:8080/showing/search/" + filter, search);
  }
}
