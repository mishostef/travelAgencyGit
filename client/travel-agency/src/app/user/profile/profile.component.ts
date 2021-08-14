import { Component, OnDestroy, OnInit } from '@angular/core';
import { TripService } from 'app/trip/trip.service';
import { Subscription } from 'rxjs';
import { getUserId, getEmail } from 'app/shared/utils';
import { ITrip } from 'app/shared/interfaces/trip';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  myId: string = getUserId();
  myEmail: string = getEmail();
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  myTrips: ITrip[] = [];
  allTrips: any[] = [];
  pricesVisible = false;
  visitedVisible = false;

  public type: string = 'bar';
  public chartData: Array<any> = [{}];
  public chartLabels: Array<any> = [];

  constructor(private tripService: TripService) {
    this.getMyTrips();
  }

  private getMyTrips() {
    this.sub1 = this.tripService.getTripsByUser(this.myId).
      subscribe(x => {
        this.myTrips = JSON.parse(x['_body']);
      });
  }

  private compareTripsPrices() {
    if (this.pricesVisible) { //toggle
       this.pricesVisible = false;
       this.sub2.unsubscribe();
        return;
       }
    if (this.sub3) this.sub3.unsubscribe();
    this.visitedVisible = false;
    this.pricesVisible = true;
    this.sub2 = this.tripService.getExcursionsAndVacations()
      .subscribe(res => {
        this.allTrips = (JSON.parse(res['_body']) as ITrip[])
          .map(trip => {
            return { 'destination': trip.destination, 'price': trip.price };
          });
        this.chartLabels = this.allTrips.map(x => x['destination']);
        this.chartData[0] = { data: this.allTrips.map(x => +x['price']), label: 'price' };
      });
  }

  private getMostVisited() {
    if (this.visitedVisible) { 
      this.sub3.unsubscribe();
      this.visitedVisible = false; 
      return; 
    }
    if (this.sub2) this.sub2.unsubscribe();
    this.pricesVisible = false;
    this.visitedVisible = true;
    this.sub3 = this.tripService.getMostVisited()
      .subscribe(res => {
        this.allTrips = (JSON.parse(res['_body']));
        console.log("all trips:")
        console.log(this.allTrips);
        console.log(this.allTrips.map(x => x['destination']));
        this.chartLabels = this.allTrips.map(x => x['destination']);
        this.chartData[0] = { data: this.allTrips.map(x => +x['length']), label: 'visitors' };
      });
  }


  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    if(this.sub2)this.sub2.unsubscribe();
    if(this.sub3)this.sub3.unsubscribe();
  }

  ngOnInit() {
  }

}
