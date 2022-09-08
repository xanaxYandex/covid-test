import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {OauthService} from '../services/oauth.service';

@Injectable({
    providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {

    constructor(private oauth: OauthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.oauth.isLoggedIn$.pipe(
            switchMap((res) =>
                res ? this.router.navigate(['/main']).then(() => false) : of(true)
            )
        );
    }

}
