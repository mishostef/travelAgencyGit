import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ITrip } from 'app/shared/interfaces/trip';
import { getTripsFromResponse } from 'app/shared/utils';
import { TripService } from 'app/trip/trip.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  all: ITrip[];
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
    this.subscription = this.tripService.getExcursionsAndVacations(destination)
    .subscribe((res) => {
      this.all = getTripsFromResponse(res);
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
