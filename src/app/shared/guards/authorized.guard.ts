import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {OauthService} from '../services/oauth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
    constructor(private oauth: OauthService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.oauth.isLoggedIn$.pipe(
            switchMap((res) =>
                res ?  of(true) : this.router.navigate(['/']).then(() => false)
            )
        );
    }

}
