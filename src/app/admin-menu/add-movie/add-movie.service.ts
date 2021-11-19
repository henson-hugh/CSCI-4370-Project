import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/model/movie';
import { Genre } from 'src/app/model/genre';
import { Showing } from 'src/app/model/showing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddMovieService {

  constructor(private _http: HttpClient) { }

  public addMovieInfoFromRemote(movie: Movie): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/movie/add/", movie);
  }

  public addGenreInfoFromRemote(genre: Genre): Observable<any> {
    return this._http.post<any>("http://localhost:8080/genre/", genre); // change this to correct endpoint
  }

  public addShowingInfoFromRemote(showing: Showing): Observable<any> {
    return this._http.post<any>("http://localhost:8080/showing/", showing); // change this to correct endpoint
  }
}