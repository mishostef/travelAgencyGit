import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TripModule } from 'app/trip/trip.module';
import { ChartsModule } from 'angular-bootstrap-md';
import { UserRoutingModule } from './user-routing.module';
import { ConfirmDeactivateGuard } from 'app/shared/guards/confirm.deactivate';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TripModule,
    ChartsModule,
    UserRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent],
  providers:[ConfirmDeactivateGuard],
  declarations: [LoginComponent, RegisterComponent, ProfileComponent]
  
})
export class UserModule { }
