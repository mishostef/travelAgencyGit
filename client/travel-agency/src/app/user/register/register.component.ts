import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  formchanges = '';
  isSubmitted = false;
  subscription: Subscription = new Subscription();

  @ViewChild('registerForm') ngForm: NgForm;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const sub1 = this.ngForm.form.valueChanges.subscribe(x => {
      console.log(x);
      console.log(x.email);
      this.formchanges = x.email.trim();
    })
    this.subscription.add(sub1);
  }

  hasChanges() {
    return !!this.formchanges && !this.isSubmitted;
  }

  handleSubmit({ email, passwords: { password } }: { email: string, passwords: { password: string } }) {
    const sub2 = this.userService.registerUser(email, password).subscribe((res) => {
      this.isSubmitted = true;
      const x = res['_body'];
      const token = JSON.parse(x)['accessToken'];
      localStorage.setItem('authToken', token);
      this.router.navigate([''])

    }, console.error);
    this.subscription.add(sub2);
  }

}
