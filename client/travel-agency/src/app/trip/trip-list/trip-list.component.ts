import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ITrip } from 'app/shared/interfaces/trip';
import { splitIntoThree } from 'app/shared/utils';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})

export class TripListComponent implements OnInit, OnChanges {
  @Input() all: ITrip[];
  allTrips: ITrip[]
  center: ITrip[] = [];
  left: ITrip[] = [];
  right: ITrip[] = [];

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`changes:${JSON.stringify(changes)}`)
    this.allTrips = this.all;
    this.split();
  }

  private split() {
    const arr = splitIntoThree(this.allTrips);
    this.left = arr.left;
    this.center = arr.center;
    this.right = arr.right;
  }

  ngOnInit() {
    this.allTrips = this.all;
    this.split();
  }

}
