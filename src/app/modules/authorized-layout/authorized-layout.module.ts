import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorizedLayoutComponent} from './authorized-layout.component';
import {RouterModule} from '@angular/router';
import {CountrySelectorModule} from '../../shared/components/county-selector/country-selector.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {LoaderModule} from '../../shared/components/loader/loader.module';

@NgModule({
    declarations: [AuthorizedLayoutComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: AuthorizedLayoutComponent}
        ]),
        CountrySelectorModule,
        ReactiveFormsModule,
        PieChartModule,
        LineChartModule,
        LoaderModule,
    ]
})
export class AuthorizedLayoutModule {
}
