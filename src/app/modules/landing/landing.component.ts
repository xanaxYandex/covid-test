import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OauthService} from '../../shared/services/oauth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {

    constructor(private oauth: OauthService) {
    }

    public signIn(): void {
        this.oauth.redirectToOAuthLogin();
    }

}
