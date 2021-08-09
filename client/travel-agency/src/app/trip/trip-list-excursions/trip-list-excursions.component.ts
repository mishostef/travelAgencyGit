import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { TripService } from '../trip.service';
import { Subscription } from 'rxjs';
import { getTripsFromResponse } from 'app/shared/utils';


@Component({
  selector: 'app-trip-list-excursions',
  templateUrl: './trip-list-excursions.component.html',
  styleUrls: ['./trip-list-excursions.component.scss']
})
export class TripListExcursionsComponent implements OnInit, OnDestroy {

  excursions: ITrip[] = [];

  subscription: Subscription;


  constructor(private travelService: TripService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.subscription = this.travelService.getExcursions()
      .subscribe(res => {
        this.excursions = getTripsFromResponse(res);
      });
  }

}
