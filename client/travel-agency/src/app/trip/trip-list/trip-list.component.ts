import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TripService } from '../trip.service';
import { ITrip } from 'app/shared/interfaces/trip';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { splitIntoThree } from 'app/shared/utils';
import { getTripsFromResponse } from 'app/shared/utils';


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
    this.subscription = this.tripService.getExcursionsAndVacations(destination).subscribe((res) => {
      this.all = getTripsFromResponse(res);
      const arr = splitIntoThree(this.all);
      this.left = arr.left;
      this.center = arr.center;
      this.right = arr.right
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
