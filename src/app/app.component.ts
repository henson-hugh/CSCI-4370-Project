import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'csci4050-movie-ui';
  
  constructor(private app: AppService, private http: HttpClient, private router: Router) { 
    this.app.authenticate(undefined, undefined);
  }
  
  logout() {
    this.http.post('logout', {}).pipe(finalize(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl('/home');
  })).subscribe();
  }
  
}
