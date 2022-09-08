import {IApiDefaultResponse} from '../corona-api/api.default';

export interface ICountry {
    ab: string;
    name: string;
}

export interface IProperty {
    key: keyof IApiDefaultResponse;
    value: string;
}
