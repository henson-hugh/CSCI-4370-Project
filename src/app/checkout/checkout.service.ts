import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _http: HttpClient) { }

  public getMovieInfoFromRemote(movieId: number): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/movie/id/" + movieId, '');
  }

  public getPriceFromRemote(type: string): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/price/get", type);
  }
}
