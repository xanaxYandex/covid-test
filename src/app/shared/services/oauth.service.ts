import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService, User} from '@auth0/auth0-angular';

@Injectable({
    providedIn: 'root'
})
export class OauthService {

    public isLoggedIn$: Observable<boolean> = this.auth.isAuthenticated$;
    public user$: Observable<User | null | undefined> = this.auth.user$;

    constructor(private auth: AuthService) {
    }

    public redirectToOAuthLogin(): void {
        this.auth.loginWithRedirect();
    }

    public logOut(): void {
        this.auth.logout({returnTo: document.location.origin});
    }

}
