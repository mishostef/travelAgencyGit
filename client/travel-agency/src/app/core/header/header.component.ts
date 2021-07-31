import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/user/user.service';
import { getEmail } from 'app/shared/utils';
import { NgForm } from '@angular/forms';
import { TripService } from 'app/trip/trip.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get islogged() { return this.userService.isLogged(); }
  constructor(private userService: UserService,
    private router: Router,
    private tripService: TripService) { }

  email = '';

  ngOnInit() {
    try {
      this.email = getEmail();
    } catch (err) {
      this.email = '';
    }
    console.log(`logged: ${this.islogged}`)
  }
  logoutHandler() {
    this.userService.logout().subscribe((res) => console.log(`token deleted, status ${res.status}`));
    localStorage.clear();
    this.router.navigate(['home']);
  }

  searchByDestinationHandler(form: NgForm) {
    const destination = (form.value['destination']).trim();
    const query = `?destination=${destination}`;
    form.resetForm();

    this.router.navigate([ 'home' ], { queryParams: {destination:destination} });
    // const url = `http://localhost:3030/excursion?destination=${destination}`;
     //.getExcursions(query).subscribe(res => console.log(res['_body']));
   
  }

}
