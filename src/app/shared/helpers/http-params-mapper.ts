import {HttpParams} from '@angular/common/http';
import {IApiDefaultParams} from '../../models/corona-api/api.default';
import {IApiHistoryParams} from '../../models/corona-api/api.history';

export const mapHttpParams: (params: IApiDefaultParams | IApiHistoryParams) => HttpParams = (params) => {
    let reqParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => value && (reqParams = reqParams.set(key, value)));
    return reqParams;
}
