import {IApiVaccinesResponse} from '../../models/corona-api/api.vaccines';

export const getVaccinatedPercent = (res: IApiVaccinesResponse) => {
    return res.population ? (((res.people_vaccinated) / res.population) * 100).toFixed(0) : null;
};

export const getNotVaccinatedAmount = (res: IApiVaccinesResponse) => {
    return res.population ? res.population - (res.people_vaccinated) : null;
};
