import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { Genre } from 'src/app/model/genre';
import { Showing } from 'src/app/model/showing';

@Injectable({
  providedIn: 'root'
})
export class ManageMoviesService {

  constructor(private _http: HttpClient) { }

  public getMovieInfoFromRemote(movieId: number): Observable<any> {
    return this._http.post<any>("http://localhost:8080/admin/movie/id/" + movieId, '');
  }

  public editMovieInfoFromRemote(movie: Movie): Observable<any> {
    return this._http.post<any>("http://localhost:8080/showing/", movie); // change this to correct endpoint
  }

  public editGenreInfoFromRemote(genre: Genre): Observable<any> {
    return this._http.post<any>("http://localhost:8080/genre/", genre); // change this to correct endpoint
  }

  public editShowingInfoFromRemote(showing: Showing): Observable<any> {
    return this._http.post<any>("http://localhost:8080/showing/", showing); // change this to correct endpoint
  }
}
