import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
  handleSubmit({ email, passwords: { password } }: { email: string, passwords: { password: string } }) {
    this.userService.registerUser(email, password).subscribe((res) => {

      const x = res['_body'];
      const token = JSON.parse(x)['accessToken'];
      document.cookie = JSON.parse(x)['accessToken']
      localStorage.setItem('authToken', token);
      this.router.navigate([''])   
      
    }, console.error);
  }
}
