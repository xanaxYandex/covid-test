import {Pipe, PipeTransform} from '@angular/core';
import {ICountry} from '../../../models/internal/country';

@Pipe({
    name: 'searchCountry'
})
export class SearchCountryPipe implements PipeTransform {

    transform(value: ICountry[], text: string | null): ICountry[] {
        return value
            .filter(i =>
                i['name'].toLocaleLowerCase()
                    .includes(text ? text.toLocaleLowerCase().trim() : '')
            );
    }

}
