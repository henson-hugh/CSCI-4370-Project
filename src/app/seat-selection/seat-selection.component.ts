import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { SeatSelectionService } from './seat-selection.service';
import { Movie } from '../model/movie';
import { Genre } from '../model/genre';
import { Showing } from '../model/showing';
import { Seat } from '../model/seat';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  msg: string = '';
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
  showing: Showing = new Showing();
  seats: string[] = [];

  displayedColumns: string[] = ['Rating', 'Duration', 'Director', 'Producer', 'Synopsis'];
  seatSelectionControl: FormControl = new FormControl();
  seatSelectionForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _service: SeatSelectionService, private _router: Router) { }

  async ngOnInit(): Promise<void> {
    this.seatSelectionForm = this._formBuilder.group({
      seatSelectionControl: this._formBuilder.array([])
    });
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
      });

      this.showing.sid = localStorage.getItem('showingSid') as unknown as number;
      this.showing.date = localStorage.getItem('showingDate') as unknown as Date;
      this.showing.time = localStorage.getItem('showingTime') as unknown as Date;
      this.showing.roomid = localStorage.getItem('showingRoomid') as unknown as number;
      this.showing.movieid = this.movie.mid;

      console.log(this.showing);

      this._service.getTakenSeatsFromRemote(this.showing).subscribe( // getting a 500, the showing entity has the correct info
        data => {
          console.log(data);
        });
  }

  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

  addSeat() {
    console.log(this.seatSelectionControl.value); // this functions is not needed
  }

  submitSeats() {
    if (this.seatSelectionControl != null) {
      for (let seat of this.seats) { // find a way to save the separate seats through this.seatSelectionControl as it holds all values for the selected

      }
      localStorage.setItem('seats', JSON.stringify(this.seatSelectionControl.value));
      this._router.navigate(['/ticket-type']);
    } else {
      this.msg = 'Please select a seat';
    }
  }
}
