import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../trip.service';
import { ITrip } from 'app/shared/interfaces/trip';
import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators/mergeMap';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  routeSub: Subscription;
  tripData: ITrip;
  constructor(private route: ActivatedRoute,
    private tripService: TripService) { }

  ngOnInit() {
    //this.routeSub =
    this.route.params
      .pipe(
        mergeMap((params) => this.tripService.getExcursionsById(params['id'])),
      ).subscribe((res) => { console.log(res); this.tripData = JSON.parse(res['_body']); });

  }


}
