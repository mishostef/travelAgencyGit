import { Component, OnDestroy, OnInit } from '@angular/core';
import { TripService } from 'app/trip/trip.service';
import { Subscription } from 'rxjs';
import { getUserId, } from 'app/shared/utils';
import { ITrip } from 'app/shared/interfaces/trip';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  myId: string = getUserId();
  subscription: Subscription;
  myTrips:ITrip[] =[]; 

  constructor(private tripService: TripService) {
    this.subscription = this.tripService.getTripsByUser(this.myId).subscribe(res=>{
      this.myTrips = JSON.parse(res['_body']) as ITrip[];      
    });
  }
  ngOnDestroy(): void {
  this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
