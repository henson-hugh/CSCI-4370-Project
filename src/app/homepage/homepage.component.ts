import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Movie } from '../model/movie';
import { SearchComponent } from '../search/search.component';
import { HomePageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  selectedValue: string;
  searchval: string = (localStorage.getItem('search') || '');
  type: string = (localStorage.getItem('type') || 'title');
  loggedIn: string = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  userId: number = 0;
  customer: Customer = new Customer();
  loginIcon: string = 'login';
  profileName: string = 'Login';
  profileURL: string = 'login';
  registerName: string = 'Register';
  registerURL: string = 'register';

  movies: Movie = new Movie();
  nowCards: any = []
  soonCards: any = []

  constructor(private _service: HomePageService, private _router: Router) {}

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

    this.getInfo();
    //send to admin page
    if (sessionStorage.getItem('privilege')) {
      this._router.navigate(['/admin-menu']);
    }
  }

  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
  }

  getInfo() {
    this._service.getNowMovieInfoFromRemote().subscribe(
      data => {
        this.nowCards = Array.of(data);
      })

      this._service.getSoonMovieInfoFromRemote().subscribe(
        data => {
          this.soonCards = Array.of(data);
        })

  }

  gotoInfo(id: number) {
    localStorage.setItem('movieid', id.toString());
    this._router.navigate(['/movie-information']);
  }


}
