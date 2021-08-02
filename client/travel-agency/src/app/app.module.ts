import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ButtonsModule, MDBBootstrapModule, NavbarModule } from 'angular-bootstrap-md';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TripModule } from './trip/trip.module';
import { AuthActivate } from './shared/guards/auth.activate';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    ButtonsModule,
    NavbarModule,
    UserModule,

    TripModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserService, AuthActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
