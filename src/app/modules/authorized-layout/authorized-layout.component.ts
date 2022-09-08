import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {FormControl} from '@angular/forms';
import {countries} from '../../shared/consts/countries';
import {map, Observable, switchMap, tap} from 'rxjs';
import {CoronaCasesStatus} from '../../models/corona-api/api.history';
import {ICountry, IProperty} from '../../models/internal/country';
import {LegendPosition} from '@swimlane/ngx-charts';
import {getNotVaccinatedAmount, getVaccinatedPercent} from '../../shared/helpers/vaccination-calc';

@Component({
    selector: 'app-authorized-layout',
    templateUrl: './authorized-layout.component.html',
    styleUrls: ['./authorized-layout.component.scss'],
    providers: [ApiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizedLayoutComponent {
    // initial settings for the charts
    public xAxisLabel: string = 'Date';
    public yAxisLabel: string = 'Confirmed Cases';
    public legendPos: LegendPosition = LegendPosition.Below;

    // variables that used in the template for data displaying logic
    public updatedAt: string | Date | null = null;
    public countries = countries as any;
    public propertiesToDisplay: IProperty[] = [
        {key: 'confirmed', value: 'Confirmed cases'},
        {key: 'recovered', value: 'Recovered'},
        {key: 'deaths', value: 'Deaths'},
        {key: 'population', value: 'Population'},
        {key: 'life_expectancy', value: 'Life Expectancy'},
    ];

    public countryControl = new FormControl<ICountry | null>(null);

    // flags for displaying loading indicator during the request
    public casesLoading$: Observable<boolean> = this.api.casesLoading$;
    public vaccinesLoading$: Observable<boolean> = this.api.vaccinesLoading$;
    public historyLoading$: Observable<boolean> = this.api.historyLoading$;

    /* observables that are presented below request data about CASES, HISTORY, VACCINES that based on country control
        and then that data is mapped to the appropriate form for the template
    */
    public coronaCases$ = this.countryValue$.pipe(
        switchMap((control) => this.api.getCases({ab: control?.ab})),
        tap((res) => this.updatedAt = res && res.updated ? new Date(res.updated) : null),
    );

    public coronaHistory$ = this.countryValue$.pipe(
        switchMap((control) => this.api.getHistory({status: CoronaCasesStatus.Confirmed, ab: control?.ab})),
        map((res) =>
            res ? {
                country: res.country ?? res.location,
                data: [{
                    name: countries.find(i => i.ab === res.abbreviation)?.name ?? res.location,
                    series: Object.entries(res.dates).map(([name, value]) => ({name, value})).reverse()
                }]
            } : null
        ),
    );

    public coronaVaccines$ = this.countryValue$.pipe(
        switchMap((control) => this.api.getVaccines({ab: control?.ab})),
        map((res) =>
            res ? {
                percentVaccinated: getVaccinatedPercent(res),
                data: [
                    // {name: 'Partially vaccinated', value: res.people_partially_vaccinated},
                    {name: 'Vaccinated', value: res.people_vaccinated},
                    {name: 'Not vaccinated', value: getNotVaccinatedAmount(res)},
                ]
            } : null
        ),
    );

    constructor(private api: ApiService) {
    }

    // initial source observable for generation of request params
    public get countryValue$(): Observable<ICountry | null> {
        return this.countryControl.valueChanges;
    }

}
