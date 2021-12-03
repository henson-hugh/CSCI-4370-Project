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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XhrInterceptor } from './XhrInterceptor';
import { LoginService } from './login/login.service';
import { RegistrationService } from './register/registration.service';
import { PasswordResetEmailComponent } from './password-reset-email/password-reset-email.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { EditProfileService } from './edit-profile/edit-profile.service';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ManageMoviesComponent } from './admin-menu/manage-movies/manage-movies.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddMovieComponent } from './admin-menu/add-movie/add-movie.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ManagePromotionsComponent } from './admin-menu/manage-promotions/manage-promotions.component';
import { ManageMoviesService } from './admin-menu/manage-movies/manage-movies.service';
import { AddMovieService } from './admin-menu/add-movie/add-movie.service';
import { SearchComponent } from './search/search.component';
import { ShowingTimeComponent } from './showing-time/showing-time.component';
import { ShowingTimeService } from './showing-time/showing-time.service';
import { SeatSelectionService } from './seat-selection/seat-selection.service';
import { SearchService } from './search/search.service';
import { MovieInformationService } from './movie-information/movie-information.service';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutService } from './checkout.service';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    EditProfileComponent,
    RegisterComponent,
    MovieInformationComponent,
    LogoutComponent,
    PasswordResetEmailComponent,
    AdminMenuComponent,
    ConfirmEmailComponent,
    EmailConfirmedComponent,
    LogoutComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    ToolbarComponent,
    ManageMoviesComponent,
    AddMovieComponent,
    ManagePromotionsComponent,
    SearchComponent,
    ShowingTimeComponent,
    SeatSelectionComponent,
    ManageUsersComponent,
    AddAdminComponent,
    CheckoutComponent,
    TicketTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    TextFieldModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [LoginService, 
    RegistrationService, 
    EditProfileService, 
    MatDatepickerModule, 
    ManageMoviesService, 
    AddMovieService, 
    ShowingTimeService, 
    SeatSelectionService, 
    SearchService, 
    MovieInformationService,
    CheckoutService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
