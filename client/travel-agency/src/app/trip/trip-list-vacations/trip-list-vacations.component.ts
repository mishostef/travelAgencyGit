import { Component, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { Subscription } from 'rxjs';
import { TripService } from '../trip.service';



@Component({
  selector: 'app-trip-list-vacations',
  templateUrl: './trip-list-vacations.component.html',
  styleUrls: ['./trip-list-vacations.component.scss']
})
export class TripListVacationsComponent implements OnInit {

  vacations: ITrip[] = [];

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
      });
  }

}
