import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { Customer } from '../model/customer';
import { Ticket } from '../model/ticket';

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

  public getCardFromRemote(customer: Customer): Observable<any> {
    return this._http.post<any>("http://localhost:8080/customer/payment/retrieve/first", customer);
  }

  // public saveBookingFromRemote(booking: Booking): Observable<any> {
  //   return this._http.post<any>("http://localhost:8080/customer/booking/save", booking);
  // }

  // public saveTicketsFromRemote(ticket: Ticket): Observable<any> {
  //   return this._http.post<any>("http://localhost:8080/customer/ticket/save", ticket);
  // }
}
