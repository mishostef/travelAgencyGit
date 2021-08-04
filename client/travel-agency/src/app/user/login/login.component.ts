import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { getPropFromResponse } from 'app/shared/utils';
import { pipe } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  handleLogin({ email, password }: { email: string, password: string }) {

    this.userService.loginUser(email, password).pipe(throttleTime(300))
    .subscribe((res) => {
      const { token } = getPropFromResponse(res, 'accessToken');
      document.cookie = token;
      localStorage.setItem('authToken', token);
      setTimeout(() => {
        this.router.navigate([''])
      }, 500);
    }, console.error);
  }


  

}
