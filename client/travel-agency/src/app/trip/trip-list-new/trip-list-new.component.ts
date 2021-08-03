import { Component, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { TripService } from '../trip.service';
import { getTripsFromResponse } from 'app/shared/utils';

@Component({
  selector: 'app-trip-list-new',
  templateUrl: './trip-list-new.component.html',
  styleUrls: ['./trip-list-new.component.scss']
})
export class TripListNewComponent implements OnInit {
  all: ITrip[] = [];
  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getNewOffers().subscribe(offers => this.all = getTripsFromResponse(offers) );
  }

}
