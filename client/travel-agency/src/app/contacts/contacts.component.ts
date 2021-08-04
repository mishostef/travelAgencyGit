import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  address: string = "8, Bacho Kiro street";
  addressCyrillic = "Бачо Киро 8";
  url = 'https://maps.google.com/maps?q=sofia' + encodeURI(this.addressCyrillic) +
    "&t=&z=13&ie=UTF8&iwloc=&output=embed"

  tel: string = "02777777";
  manager: string = "Man Ager";

  trustedUrl: string = '';
  constructor(private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url) as string;
  }


  ngOnInit() {
  }

}
