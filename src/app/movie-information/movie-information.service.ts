import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';


@Injectable({
  providedIn: 'root'
})
export class MovieInformationService {
    constructor(private _http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "http://localhost:8080"});
    options = { headers: this.headers };

      public getMovieInfoFromRemote(movieId: number): Observable<any> {
        return this._http.post<any>("http://localhost:8080/showing/movie/info", movieId);
      }

      public getCustomerInfoFromRemote(customer: Customer): Observable<any> {
        return this._http.get<any>("http://localhost:8080/customer/" + sessionStorage.getItem('cid'));
      }
}
