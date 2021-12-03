import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class ShowingTimeService {

  constructor(private _http: HttpClient) { }

  public getMovieInfoFromRemote(movieId: number): Observable<any> {
    return this._http.post<any>("http://localhost:8080/showing/movie/info", movieId);
  }

  public getCustomerInfoFromRemote(customer: Customer): Observable<any> {
    return this._http.get<any>("http://localhost:8080/customer/" + sessionStorage.getItem('cid'));
  }
}
