import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IApiCasesResponse} from '../../models/corona-api/api.cases';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {IApiDefaultParams, IApiDefaultResponse} from '../../models/corona-api/api.default';
import {IApiHistoryParams, IApiHistoryResponse} from '../../models/corona-api/api.history';
import {IApiVaccinesResponse} from '../../models/corona-api/api.vaccines';
import {mapHttpParams} from '../helpers/http-params-mapper';

@Injectable()
export class ApiService {

    private coronaURI = environment.coronaApi;
    private casesLoadingSource = new BehaviorSubject<boolean>(false);
    private vaccinesLoadingSource = new BehaviorSubject<boolean>(false);
    private historyLoadingSource = new BehaviorSubject<boolean>(false);
    public casesLoading$ = this.casesLoadingSource.asObservable();
    public vaccinesLoading$ = this.vaccinesLoadingSource.asObservable();
    public historyLoading$ = this.historyLoadingSource.asObservable();

    constructor(private http: HttpClient) {
    }

    public getCases(reqParams?: IApiDefaultParams): Observable<IApiCasesResponse | null> {
        this.casesLoadingSource.next(true)
        const params = reqParams ? mapHttpParams(reqParams) : {};
        return this.http.get<{ [key: string]: IApiDefaultResponse }>(`${this.coronaURI}/cases`, {params})
            .pipe(
                map((res) => res['All']),
                tap(() => this.casesLoadingSource.next(false)),
                catchError(() => of(null))
            );
    }

    public getVaccines(reqParams?: IApiDefaultParams): Observable<IApiVaccinesResponse | null> {
        this.vaccinesLoadingSource.next(true)
        const params = reqParams ? mapHttpParams(reqParams) : {};
        return this.http.get<{ [key: string]: IApiVaccinesResponse }>(`${this.coronaURI}/vaccines`, {params})
            .pipe(
                map((res) => res['All']),
                tap(() => this.vaccinesLoadingSource.next(false)),
                catchError(() => of(null))
            );
    }

    public getHistory(reqParams: IApiHistoryParams): Observable<IApiHistoryResponse | null> {
        this.historyLoadingSource.next(true)
        const params = reqParams ? mapHttpParams(reqParams) : {};
        return this.http.get<{ [key: string]: IApiHistoryResponse }>(`${this.coronaURI}/history`, {params})
            .pipe(
                map((res) => res['All']),
                tap(() => this.historyLoadingSource.next(false)),
                catchError(() => of(null))
            );
    }

}
