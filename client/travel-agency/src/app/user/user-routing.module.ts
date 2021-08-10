import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { RegisterComponent } from '../user/register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }

];

export const UserRoutingModule = RouterModule.forRoot(routes);
