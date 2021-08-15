import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { TripService } from '../trip.service';
import { getUserId } from 'app/shared/utils';
import { UserService } from 'app/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {
  @Input() data?: ITrip;
  start: string = "start date";
  end: string = "end date";
  image = "no image";


  canJoin: boolean = false;
  id: string;
  subscription: Subscription;

  constructor(private tripService: TripService,
    private userService: UserService) { }

  ngOnDestroy(): void {
    if (!!this.subscription) this.subscription.unsubscribe();
  }


  ngOnInit() {
    this.id = this.data['_id'];
    this.canBeEnlisted();
  }



  reserveHandler() {
    console.log(`id=${this.id}`);
    this.subscription = this.tripService.reserveSeat(this.id).subscribe((res) => {
      console.dir(res);
      const body = JSON.parse(res['_body']);
      console.log(`body ${body}`);
      alert(body['message']);
    });
    this.canJoin = false;
  }

  canBeEnlisted() {
    if (!this.userService.isLogged()) { this.canJoin = false; return; }
    this.tripService.checkUserEnlisted(this.id).subscribe((res) => {
      const excursionData = JSON.parse(res['_body']);
      const participants = excursionData['participants'];
      const userid = getUserId();
      const isInList: boolean = participants.includes(userid);
      const availableSeats = Number(excursionData['seats']) > 0;
      const canBeEnl = availableSeats && !isInList;
      if (canBeEnl) this.canJoin = true;
    });
  }

}
