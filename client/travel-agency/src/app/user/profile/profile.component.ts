import { Component, OnDestroy, OnInit } from '@angular/core';
import { TripService } from 'app/trip/trip.service';
import { Subscription } from 'rxjs';
import { getUserId, } from 'app/shared/utils';
import { ITrip } from 'app/shared/interfaces/trip';
import { pipe } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { toArray } from 'rxjs/operator/toArray';
import { of } from 'rxjs/observable/of';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  myId: string = getUserId();
  subscription: Subscription;
  sub2: Subscription;
  myTrips: ITrip[] = [];
  allTrips: any[] = [];

  public type: string = 'bar';
  public chartData: Array<any> = [{}];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    },
    {
      backgroundColor: 'rgba(151,187,205,0.2)',
      borderColor: 'rgba(151,187,205,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(151,187,205,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(151,187,205,1)'
    }
  ];




  constructor(private tripService: TripService,
    private userService: UserService) {
    this.subscription =
      this.tripService.getTripsByUser(this.myId).
        subscribe(x => {
          this.myTrips = JSON.parse(x['_body']);
        });

    this.sub2 = this.tripService.getExcursionsAndVacations()
      .subscribe(res => {
        this.allTrips = (JSON.parse(res['_body']) as ITrip[])
          .map(trip => {
            return { 'destination': trip.destination, 'price': trip.price }
          });
        console.log(`this.allTrips:${JSON.stringify(this.allTrips)}`);
        this.chartLabels = this.allTrips.map(x => x['destination']);
        this.chartData[0] = { data: this.allTrips.map(x => +x['price']), label: 'price' };
      });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
  }

  ngOnInit() {
  }

}
