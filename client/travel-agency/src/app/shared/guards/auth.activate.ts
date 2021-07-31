import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "app/user/user.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthActivate implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | Observable<boolean> | Promise<boolean> {
        const { authenticationRequired, failureRedirectTo } = route.data;
        if (typeof authenticationRequired == 'boolean' && (authenticationRequired === this.userService.isLogged())) {
            return true;
        }
        //const loginRedirectUrl = route.url.reduce((acc,segment)=>`${acc}/${segment}`,'')

        var x = this.router.navigate(failureRedirectTo || '/');
        return x;
    }

}
