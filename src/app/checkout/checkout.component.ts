import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../model/booking';
import { Customer } from '../model/customer';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { PaymentCard } from '../model/payment-card';
import { Showing } from '../model/showing';
import { Ticket } from '../model/ticket';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
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
  prices: number[] = [];
  card: PaymentCard = new PaymentCard();
  finalPrice: number = 0;
  book: Booking = new Booking();
  ticket: Ticket[] = [];

  displayedColumns: string[] = ['Rating', 'Duration', 'Director', 'Producer', 'Synopsis'];
  seatSelectionControl: FormControl = new FormControl();
  seatSelectionForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _service: CheckoutService, private _router: Router) { }

  ngOnInit(): void {
    this.checkoutForm =this._formBuilder.group({
      cardNumber: '',
      expdate: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      promoKey: ''
    });
    this.seats = JSON.parse(localStorage.getItem("seats") || "");
    this.showing.roomid = JSON.parse(localStorage.getItem("showingRoomid") || "");
    this._service.getMovieInfoFromRemote(Number(localStorage.getItem("movieid"))).subscribe(
      data => {
        this.movie.title = data.movie['title'];
        this.movie.trailerpic = data.movie['trailerpic'];
      });

      this._service.getPriceFromRemote("child").subscribe(
        data => {
          for (let i = 0; i < Number(localStorage.getItem('child')); i++) {
            this.prices.push(data);
            this.finalPrice += data;
          }
        });

      this._service.getPriceFromRemote("adult").subscribe(
        data => {
          for (let i = 0; i < Number(localStorage.getItem('adult')); i++) {
            this.prices.push(data);
            this.finalPrice += data;
          }
        });

      this._service.getPriceFromRemote("elderly").subscribe(
        data => {
          for (let i = 0; i < Number(localStorage.getItem('elderly')); i++) {
            this.prices.push(data);
            this.finalPrice += data;
          }
        });

        this.customer.cid = Number(sessionStorage.getItem('cid') || "");
        this._service.getCardFromRemote(this.customer).subscribe(
          data => {
            
            this.checkoutForm.controls.cardNumber.setValue(data['cardNumber']);
            this.checkoutForm.controls.expdate.setValue(data['expDate']);
            this.checkoutForm.controls.street.setValue(data['street']);
            this.checkoutForm.controls.city.setValue(data['city']);
            this.checkoutForm.controls.state.setValue(data['state']);
            this.checkoutForm.controls.zip.setValue(data['zip']);
            console.log(data);
          });
  }

  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

  find(i: number) {
    return this.prices[i];
  }

  checkout(){
    this.book.customerid = this.customer.cid;
    // this._service.saveBookingFromRemote(this.book).subscribe(
    //   data => {
        
    //   });

      this._router.navigate(['/home']);

  }

}
