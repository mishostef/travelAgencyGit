import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  address: string = "8, Bacho Kiro street";
  tel: string = "02777777";
  manager:string= "Man Ager";
  constructor() { }

  ngOnInit() {
  }

}
