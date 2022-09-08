import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OauthService} from '../../shared/services/oauth.service';
import {Observable} from 'rxjs';
import {User} from '@auth0/auth0-angular';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    public isLoggedIn$: Observable<boolean> = this.oauth.isLoggedIn$;
    public user$: Observable<User | null | undefined> = this.oauth.user$;

    constructor(private oauth: OauthService) {
    }

    public logOut(): void {
        this.oauth.logOut();
    }

}
