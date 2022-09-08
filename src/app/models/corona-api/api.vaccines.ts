import {IApiDefaultResponse} from './api.default';

export interface IApiVaccinesResponse extends Partial<IApiDefaultResponse> {
    administered: number;
    people_vaccinated: number;
    people_partially_vaccinated: number;
}
