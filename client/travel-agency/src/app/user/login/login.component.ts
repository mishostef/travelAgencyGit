import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { getPropFromResponse } from 'app/shared/utils';

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

    this.userService.loginUser(email, password).subscribe((res) => {
      const { x, token } = getPropFromResponse(res, 'accessToken');
      document.cookie = token;
      localStorage.setItem('authToken', token);
      this.router.navigate([''])
    }, console.error);
  }


  

}
