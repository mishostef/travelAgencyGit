import { Component, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { Subscription } from 'rxjs';
import { TripService } from '../trip.service';
import { splitIntoThree } from 'app/shared/utils';


@Component({
  selector: 'app-trip-list-vacations',
  templateUrl: './trip-list-vacations.component.html',
  styleUrls: ['./trip-list-vacations.component.scss']
})
export class TripListVacationsComponent implements OnInit {

  vacations: ITrip[] = [];
  left: ITrip[] = [];
  right: ITrip[] = [];
  center: ITrip[] = [];

  subscription: Subscription;

  constructor(private travelService: TripService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.travelService.getVactions().
      subscribe(res => {
        this.vacations = (JSON.parse(res['_body']) as ITrip[])
          .map(x => {
            x.img = x.img.includes(`https`) ? x.img : `../../../assets/${x.img}.jpg`;
            return x;
          });

        const arr = splitIntoThree(this.vacations);
        this.left = arr.left;
        this.right = arr.right;
        this.center = arr.center;
      });
  }

}
