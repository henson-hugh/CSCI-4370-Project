import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';
import { PasswordResetEmailComponent } from './password-reset-email/password-reset-email.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { ManageMoviesComponent } from './admin-menu/manage-movies/manage-movies.component';
import { AddMovieComponent } from './admin-menu/add-movie/add-movie.component';
import { ManagePromotionsComponent } from './admin-menu/manage-promotions/manage-promotions.component';
import { SearchComponent } from './search/search.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { ShowingTimeComponent } from './showing-time/showing-time.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ManagePricesComponent } from './manage-prices/manage-prices.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'admin-menu', component: AdminMenuComponent},
  { path: 'confirm-email', component: ConfirmEmailComponent},
  { path: 'email-confirmed', component: EmailConfirmedComponent},
  { path: 'password-reset-email', component: PasswordResetEmailComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'password-reset', component: PasswordResetComponent},
  { path: 'password-reset-confirm', component: PasswordResetConfirmComponent},
  { path: 'manage-movies', component: ManageMoviesComponent},
  { path: 'add-movie', component: AddMovieComponent},
  { path: 'manage-promotions', component: ManagePromotionsComponent},
  { path: 'search', component: SearchComponent},
  { path: 'movie-information', component: MovieInformationComponent},
  { path: 'showing-time', component: ShowingTimeComponent},
  { path: 'seat-selection', component: SeatSelectionComponent},
  { path: 'manage-users', component: ManageUsersComponent},
  { path: 'add-admin', component: AddAdminComponent},
  { path: 'manage-prices', component: ManagePricesComponent}
  { path: 'checkout', component: CheckoutComponent},
  { path: 'ticket-type', component: TicketTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
