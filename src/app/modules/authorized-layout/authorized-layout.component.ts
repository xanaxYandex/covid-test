import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StateService} from '../../shared/services/state.service';
import {ApiService} from '../../shared/services/api.service';

@Component({
    selector: 'app-authorized-layout',
    templateUrl: './authorized-layout.component.html',
    styleUrls: ['./authorized-layout.component.scss'],
    providers: [StateService, ApiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizedLayoutComponent implements OnInit {

    constructor() {
    }

    public ngOnInit(): void {
    }

}
