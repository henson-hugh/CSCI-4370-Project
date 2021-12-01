import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { Showing } from '../model/showing';
import { MovieInformationService } from './movie-information.service';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.scss']
})
export class MovieInformationComponent implements OnInit {

  selectedValue: string;
  searchval: string = (localStorage.getItem('search') || '');
  type: string = (localStorage.getItem('type') || '');
  loggedIn: string = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  userId: number = 0;
  customer: Customer = new Customer();
  loginIcon: string = 'login';
  profileName: string = 'Login';
  profileURL: string = 'login';
  registerName: string = 'Register';
  registerURL: string = 'register';
  movie: Movie = new Movie();
  genres: Genre[] = [];
  showings: Showing[] = [];
  displayedColumns: string[] = ['Rating', 'Duration', 'Director', 'Producer', 'Synopsis'];
  safeUrl: SafeResourceUrl;

  constructor(private _service: MovieInformationService, private _router: Router, private _sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {

    if (this.loggedIn.toString() == 'true') {
      this.userId = Number(sessionStorage.getItem('cid')) || 0;
      this.customer.cid = this.userId;
      await this._service.getCustomerInfoFromRemote(this.customer).subscribe(
        data => {
          this.profileName = data.customer['firstName'];
          this.profileURL = "edit-profile";
          this.registerName = "Logout";
          this.registerURL = "logout";
          this.loginIcon = "edit";
        })
    }

    this._service.getMovieInfoFromRemote(Number(localStorage.getItem('movieid'))).subscribe(
      data => {
        console.log(data);
        this.movie.title = data.movie['title'];
        this.movie.rating = data.movie['rating'];
        this.movie.director = data.movie['director'];
        this.movie.producer = data.movie['producer'];
        this.movie.synopsis = data.movie['synopsis'];
        this.movie.duration = data.movie['duration'];
        this.movie.trailerpic = data.movie['trailerpic'];

        this.movie.trailervid = data.movie['trailervid'] + '?origin=localhost:4200';
        this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailervid);

        this.genres = data.genre;
        this.showings = data.showing;
      })
    
    
  }
  
  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

}
