import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TripService } from '../trip.service';
import { ITrip } from 'app/shared/interfaces/trip';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit, OnDestroy {
  all: ITrip[] = [];
  center: ITrip[] = [];
  left: ITrip[] = [];
  right: ITrip[] = [];
  subscription: Subscription;


  constructor(private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((ev) => {
        const url = ev.url
        const dest = url.split('=')[1];
        const destination = dest == undefined ? '' : `?destination=${dest}`;
        this.getCurrentExcursions(destination);        
      });
  }

  private getCurrentExcursions(destination: string) {
    this.subscription = this.tripService.getExcursions(destination).subscribe((res) => {
      const allTrips = JSON.parse(res['_body']);
      this.all = (allTrips as ITrip[]).map(x => {
        x.img = `../../../assets/${x.img}.jpg` || x.img;
        return x;
      });
      const n = this.all.length / 3 | 1;
      this.left = this.all.slice(0, n);
      console.log(`this.center.length  ${this.center.length}`)
      this.right = this.all.slice(n, 2 * n);
      console.log(`this.left.length ${this.left.length}`)
      this.center = this.all.slice(2 * n);
      console.log(`right: ${this.right.length}`);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const dest = this.activatedRoute.snapshot.queryParams['destination'];
    const destination = dest == undefined ? '' : `?destination=${dest}`;
    this.getCurrentExcursions(destination);
   
  }

}
