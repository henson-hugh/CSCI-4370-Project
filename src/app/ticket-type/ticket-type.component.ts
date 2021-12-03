import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { Showing } from '../model/showing';
import { Ticket } from '../model/ticket';
import { MovieInformationService } from '../movie-information/movie-information.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.scss']
})
export class TicketTypeComponent implements OnInit {

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
  casts: string[] = [];
  displayedColumns: string[] = ['Rating', 'Duration', 'Director', 'Producer', 'Synopsis'];
  ticketTypeForm: FormGroup;
  ticket: Ticket = new Ticket();

  constructor(private _formBuilder: FormBuilder, private _service: MovieInformationService, private _router: Router) { }

  async ngOnInit(): Promise<void> {

    this.ticketTypeForm = this._formBuilder.group({
      child: '',
      adult: '',
      elderly: ''
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

        this.movie.trailervid = data.movie['trailervid'] + '?origin=localhost:4200';

        this.genres = data.genre;
        this.showings = data.showing;
        this.casts = data.cast;
      })

    // get info from seat-selection page with seatid
  }

  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

  saveTicketTypes() {
    this._router.navigate(['checkout']);
  }
}
