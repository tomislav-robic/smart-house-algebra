import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    loggedIn:boolean = false;
    constructor(private _loginService: LoginService, private router: Router) {}

    ngOnInit() {
    }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree {
        if (localStorage.getItem("l")) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }
}