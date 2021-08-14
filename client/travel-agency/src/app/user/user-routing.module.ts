import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from 'app/shared/guards/auth.activate';
import { ConfirmDeactivateGuard } from 'app/shared/guards/confirm.deactivate';
import { LoginComponent } from '../user/login/login.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { RegisterComponent } from '../user/register/register.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: false,
            failureRedirectTo: '/home'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthActivate],
        canDeactivate:[ConfirmDeactivateGuard],
        data: {
            authenticationRequired: false,
            failureRedirectTo: '/home'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent
    }

];

export const UserRoutingModule = RouterModule.forRoot(routes);
