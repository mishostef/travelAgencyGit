import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthActivate } from './shared/guards/auth.activate';
import { TripDetailsComponent } from './trip/trip-details/trip-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: HomeComponent
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
        path: '**',
        component: NotFoundComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
