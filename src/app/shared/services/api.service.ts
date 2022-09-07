import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IApiCasesResponse} from '../../models/api-cases';
import {Observable} from 'rxjs';
import {IApiDefaultParams} from '../../models/api-default';
import {IApiHistoryParams, IApiHistoryResponse} from '../../models/api-history';
import {IApiVaccinesResponse} from '../../models/api-vaccines';
import {mapHttpParams} from '../helpers/http-params-mapper';

@Injectable()
export class ApiService {

    private coronaURI = environment.coronaApi;

    constructor(private http: HttpClient) {
    }

    public getCases(reqParams: IApiDefaultParams): Observable<IApiCasesResponse> {
        const params = mapHttpParams(reqParams);
        return this.http.get<IApiCasesResponse>(`${this.coronaURI}/cases`, {params})
    }

    public getVaccines(reqParams: IApiDefaultParams): Observable<IApiVaccinesResponse> {
        const params = mapHttpParams(reqParams);
        return this.http.get<IApiVaccinesResponse>(`${this.coronaURI}/vaccines`, {params})
    }

    public getHistory(reqParams: IApiHistoryParams): Observable<IApiHistoryResponse> {
        const params = mapHttpParams(reqParams);
        return this.http.get<IApiHistoryResponse>(`${this.coronaURI}/history`, {params})
    }

}
