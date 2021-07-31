import { Component, OnChanges, OnInit, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { TripService } from '../trip.service';
import { ITrip } from 'app/shared/interfaces/trip';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit, OnDestroy {
  all: ITrip[] = [];
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
        console.log(x.img)
        x.img = `../../../assets/${x.img}.jpg`||x.img;
        return x;
      }).slice(0, 8);

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
