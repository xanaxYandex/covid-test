import {IApiDefaultParams, IApiDefaultResponse} from './api.default';

export type DateLike = string;

export enum CoronaCasesStatus {
    Confirmed = 'Confirmed',
    Deaths = 'Deaths',
    Recovered = 'Recovered'
}

export interface IApiHistoryResponse extends Partial<IApiDefaultResponse> {
    dates: {[key: DateLike]: number}
}

export interface IApiHistoryParams extends IApiDefaultParams {
    status: CoronaCasesStatus;
}
