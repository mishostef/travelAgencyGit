import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthActivate } from './shared/guards/auth.activate';
import { TripDetailsComponent } from './trip/trip-details/trip-details.component';
import { TripListExcursionsComponent } from './trip/trip-list-excursions/trip-list-excursions.component';
import { TripListNewComponent } from './trip/trip-list-new/trip-list-new.component';
import { TripListPromoComponent } from './trip/trip-list-promo/trip-list-promo.component';
import { TripListVacationsComponent } from './trip/trip-list-vacations/trip-list-vacations.component';
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: TripListComponent
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'details/:id',
        pathMatch: 'full',
        component: TripDetailsComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            failureRedirectTo: '/home'
        }
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
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
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
