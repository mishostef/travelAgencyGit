import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [LoginComponent, RegisterComponent],
  declarations: [LoginComponent, RegisterComponent, ProfileComponent]
})
export class UserModule { }
