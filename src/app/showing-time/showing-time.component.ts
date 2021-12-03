import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { ShowingTimeService } from './showing-time.service';
import { Movie } from '../model/movie';
import { Genre } from '../model/genre';
import { Showing } from '../model/showing';

@Component({
  selector: 'app-showing-time',
  templateUrl: './showing-time.component.html',
  styleUrls: ['./showing-time.component.scss']
})
export class ShowingTimeComponent implements OnInit {

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
  showSelection: Showing = new Showing();
  displayedColumns: string[] = ['Rating', 'Duration', 'Director', 'Producer', 'Synopsis'];

  constructor(private _service: ShowingTimeService, private _router: Router) { }

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

        this.genres = data.genre;
        this.showings = data.showing;
      })
  }
  
  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

  selectTime(showing: Showing) {
    console.log(showing.date)
    localStorage.setItem('showingDate', showing.date as unknown as string);
    localStorage.setItem('showingTime', showing.time as unknown as string);
    localStorage.setItem('showingRoomid', showing.roomid as unknown as string);
    localStorage.setItem('showingSid', showing.sid as unknown as string);
    this._router.navigate(['seat-selection']);
  }
}
