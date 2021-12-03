import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AddAdminService } from './add-admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  adminForm: FormGroup;
  user: User = new User();

  constructor(private _formBuilder: FormBuilder, private _service: AddAdminService, private _router: Router) { }

  ngOnInit(): void {
    this.adminForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPasswordCtrl: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  addAdmin() {
    this.user.email = this.adminForm.value['email'];
    this.user.password = this.adminForm.value['password'];
    this._service.saveUserInfoFromRemote(this.user).subscribe(
      data => {

      });
  }

}
