import { Component, OnInit } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { TripService } from '../trip.service';
@Component({
  selector: 'app-trip-list-promo',
  templateUrl: './trip-list-promo.component.html',
  styleUrls: ['./trip-list-promo.component.scss']
})
export class TripListPromoComponent implements OnInit {
  promoted: ITrip[] = [];

  constructor(private travelService: TripService) { }

  ngOnInit() {
    this.travelService.getPromoted().
      subscribe(res => {
        this.promoted = (JSON.parse(res['_body']) as ITrip[])
          .map(x => {
            x.img = `../../../assets/${x.img}.jpg` || x.img;
            return x;
          });
      });

  }

}
