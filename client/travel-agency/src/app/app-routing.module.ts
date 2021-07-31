import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthActivate } from './shared/guards/auth.activate';
import { TripDetailsComponent } from './trip/trip-details/trip-details.component';
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
        path:'details/:id',
        pathMatch:'full',
        component:TripDetailsComponent,
        canActivate:[AuthActivate],
        data:{
            authenticationRequired:true,
            failureRedirectTo:'/home'
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
