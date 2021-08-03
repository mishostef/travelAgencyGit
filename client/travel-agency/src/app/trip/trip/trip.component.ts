import { Component, Input, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { TripService } from '../trip.service';
import { getUserId } from 'app/shared/utils';
import { Router } from '@angular/router';
import { UserService } from 'app/user/user.service';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() data?: ITrip;
  start: string = "start date";
  end: string = "end date";
  image = "no image";


  canJoin: boolean = false;
  id: string;

  constructor(private tripService: TripService,
    private userService:UserService) { }


  ngOnInit() {
   // console.log(`data is:${JSON.stringify(this.data)}`)
    //this.start = this.dateTransform(this.data.startAt);
    this.end = this.dateTransform(this.data.endAt);
    this.id = this.data['_id'];
    this.canBeEnlisted();
  }



  reserveHandler() {
    console.log(`id=${this.id}`);
    this.tripService.reserveSeat(this.id).subscribe((res) => {
      console.dir(res);
      const body = JSON.parse(res['_body']);
      console.log(`body ${body}`);
      alert(body['message']);
    });
    this.canJoin = false;
  }

  canBeEnlisted() {
    //console.log(`in check enlisted`)
    //console.log(`id=${this.id}`);
    if(!this.userService.isLogged()){this.canJoin=false; return;}
    this.tripService.checkUserEnlisted(this.id).subscribe((res) => {
      const body = res['_body'];
      const excursionData = JSON.parse(body);
      const participants = excursionData['participants'];
      const userid = getUserId();
      const isInList: boolean = participants.includes(userid);
      const availableSeats = Number(excursionData['seats']) > 0;
      const canBeEnl = availableSeats && !isInList;
      if (canBeEnl) this.canJoin = true;
    });
  }


  dateTransform(d: any): string {
    const dateTime = new Date(d);
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const fullYear = dateTime.getFullYear();
    return `${day}/${month}/${fullYear}`
  }
}
