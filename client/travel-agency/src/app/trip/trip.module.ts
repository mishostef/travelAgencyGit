import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripService } from './trip.service';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[TripComponent, TripListComponent,TripDetailsComponent],
  providers:[TripService],
  declarations: [TripComponent, TripListComponent, TripDetailsComponent]
})
export class TripModule { }
