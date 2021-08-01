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
    private router: Router) { }

  email = '';

  ngOnInit() {
    this.email = this.getMail();
  }

  private getMail() {
    let email = ''
    try {
      email = getEmail();
    } catch (err) {
      email = '';
    }
    console.log(`logged: ${this.islogged}`);
    return email;
  }

  logoutHandler() {
    this.userService.logout().subscribe((res) => console.log(`token deleted, status ${res.status}`));
    localStorage.clear();
    this.router.navigate(['home']);
  }

  searchByDestinationHandler(form: NgForm) {
    const destination = (form.value['destination']).trim();
    form.resetForm();
    this.router.navigate(['home'], { queryParams: { destination: destination } });
  }

}
