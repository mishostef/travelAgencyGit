import { RouterModule, Routes } from '@angular/router';
import { TripListPromoComponent } from './trip-list-promo/trip-list-promo.component';
import { TripListVacationsComponent } from './trip-list-vacations/trip-list-vacations.component';
import { TripListNewComponent } from './trip-list-new/trip-list-new.component';
import { TripListExcursionsComponent } from './trip-list-excursions/trip-list-excursions.component';

const routes: Routes = [
    {
        path: 'promotions',
        component: TripListPromoComponent
    },
    {
        path: 'vacations',
        component: TripListVacationsComponent
    },
    {
        path: 'new',
        component: TripListNewComponent
    },
    {
        path: 'excursions',
        component: TripListExcursionsComponent
    }
]

export const TripRoutingModule = RouterModule.forChild(routes);