import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountrySelectorComponent} from './country-selector.component';
import {SearchCountryPipe} from './search-country.pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        CountrySelectorComponent,
        SearchCountryPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CountrySelectorComponent
    ]
})
export class CountrySelectorModule {
}
