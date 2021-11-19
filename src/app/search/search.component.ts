import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchval: string = (localStorage.getItem('search') || '');
  type: string = (localStorage.getItem('type') || '');
  profileName: string = 'Login';
  profileURL: string = 'login';
  registerName: string = 'Register';
  registerURL: string = 'register';
  loggedIn: string = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  userId: number = 0;
  customer: Customer = new Customer();
  loginIcon: string = 'login';
  cards: any = []
  constructor(private _service: SearchService, private _router: Router) {}

  async ngOnInit(): Promise<void> {
    if (this.loggedIn.toString() == 'true') {
      this.userId = Number(sessionStorage.getItem('cid')) || 0;
      this.customer.cid = this.userId;
      this._service.getCustomerInfoFromRemote(this.customer).subscribe(
        data => {
          this.profileName = data.customer['firstName'];
          this.profileURL = "edit-profile";
          this.registerName = "Logout";
          this.registerURL = "logout";
          this.loginIcon = "edit";
        }
      )
    }
    // Search results
    this._service.getMovieInfoFromRemote(this.type, this.searchval).subscribe(
      data => {
        this.cards = Array.of(data);
        console.log(data);
      })

    console.log(this.type);
  }

  search() {
    localStorage.setItem('search', this.searchval);
    localStorage.setItem('type', this.type);
    this._router.navigate(['/search']);
    window.location.reload()
  }

  gotoInfo(id: number) {
    localStorage.setItem('movieid', id.toString());
    this._router.navigate(['/movie-information']);
  }
}
