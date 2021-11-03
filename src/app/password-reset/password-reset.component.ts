import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordResetService } from './password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  email: string = "";
  id: number = 0;


  constructor(private _service: PasswordResetService, private _router: Router) { }

  ngOnInit(): void {
  }
  
  sendResetEmail() {
    this._service.sendResetEmailFromRemote(this.email).subscribe(
      data => {
        this.id = data['cid'];
        localStorage.setItem("resetid", this.id.toString());
        this._router.navigate(['/home']);
      }
    )
  }



}
