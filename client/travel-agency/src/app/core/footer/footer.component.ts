import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private userService: UserService) { }
  get islogged() { return this.userService.isLogged(); }
  ngOnInit() {
  }

}
