import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { LogoutComponent } from './logout/logout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XhrInterceptor } from './XhrInterceptor';
import { LoginService } from './login/login.service';
import { RegistrationService } from './register/registration.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { EditProfileService } from './edit-profile/edit-profile.service';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    EditProfileComponent,
    RegisterComponent,
    MovieInformationComponent,
    LogoutComponent,
    PasswordResetComponent,
    AdminMenuComponent,
    ConfirmEmailComponent,
    EmailConfirmedComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService, RegistrationService, EditProfileService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
