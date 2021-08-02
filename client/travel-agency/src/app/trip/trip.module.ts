import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripService } from './trip.service';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { RouterModule } from '@angular/router';
import { TripListPromoComponent } from './trip-list-promo/trip-list-promo.component';
import { TripListVacationsComponent } from './trip-list-vacations/trip-list-vacations.component';
import { TripListNewComponent } from './trip-list-new/trip-list-new.component';
import { TripListExcursionsComponent } from './trip-list-excursions/trip-list-excursions.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[TripComponent, TripListComponent, TripDetailsComponent, TripListPromoComponent, TripListVacationsComponent, TripListNewComponent, TripListExcursionsComponent],
  providers:[TripService],
  declarations: [TripComponent, TripListComponent, TripDetailsComponent, TripListPromoComponent, TripListVacationsComponent, TripListNewComponent, TripListExcursionsComponent]
})
export class TripModule { }
