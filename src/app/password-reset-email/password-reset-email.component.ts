import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordResetEmailService } from './password-reset-email.service';

@Component({
  selector: 'app-password-reset-email',
  templateUrl: './password-reset-email.component.html',
  styleUrls: ['./password-reset-email.component.scss']
})
export class PasswordResetEmailComponent implements OnInit {

  email: string = "";
  id: number = 0;


  constructor(private _service: PasswordResetEmailService, private _router: Router) { }

  ngOnInit(): void {
  }

  sendResetEmail() {
    this._service.sendResetEmailFromRemote(this.email).subscribe(
      data => {
        //this.id = data['uid'];
        localStorage.setItem("resetid", data['uid']);
        this._router.navigate(['/home']);
      }
    )
  }



}
