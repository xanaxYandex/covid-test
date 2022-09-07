import {HttpParams} from '@angular/common/http';
import {IApiDefaultParams} from '../../models/api-default';
import {IApiHistoryParams} from '../../models/api-history';

export const mapHttpParams: (params: IApiDefaultParams | IApiHistoryParams) => HttpParams = (params) => {
    const reqParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => reqParams.set(key, value));
    return reqParams;
}
