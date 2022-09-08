import {Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {ICountry} from '../../../models/internal/country';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CountrySelectorComponent),
            multi: true
        }
    ],
    animations: [
        trigger('grow', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({height: 0}),
                animate('200ms cubic-bezier(.17,.67,.83,.67)', style({height: '{{optionsHeight}}px'}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate('200ms cubic-bezier(.17,.67,.83,.67)', style({height: 0})),
            ])
        ])
    ]
})
export class CountrySelectorComponent implements ControlValueAccessor {
    private OPTION_HEIGHT_IN_PIXELS = 45;
    private MAX_OPTIONS_HEIGHT_IN_PIXELS = 200;
    private _value!: ICountry;
    private _options: ICountry[] = [];
    public optionsHeight!: number;

    @Input() public placeholder = '';
    @Input() public set options(options: ICountry[]) {
        this._options = options;

        // setting the height of option list depending on amount of options
        this.optionsHeight = options.length * this.OPTION_HEIGHT_IN_PIXELS > this.MAX_OPTIONS_HEIGHT_IN_PIXELS ?
            this.MAX_OPTIONS_HEIGHT_IN_PIXELS : options.length * this.OPTION_HEIGHT_IN_PIXELS;
        this.overflowAuto = this.options.length * this.OPTION_HEIGHT_IN_PIXELS > this.MAX_OPTIONS_HEIGHT_IN_PIXELS;
    }
    public get options() {return this._options};

    public overflowAuto = false;
    public showOptions = false;
    public control = new FormControl('', {nonNullable: true});

    @ViewChild('wrapper') wrapper!: ElementRef;

    get controlValue$(): Observable<string> {
        return this.control.valueChanges;
    }

    set value(value: ICountry) {
        this._value = value;
        this.onChange(value);
        this.onTouch(value);
    }

    get value(): ICountry {
        return this._value;
    }

    public onChange: any = () => {}

    public onTouch: any = () => {}

    public switchShowingOptions() {
        this.showOptions = !this.showOptions;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    setDisabledState(isDisabled: boolean) {}

    // registering the click outside the current component to close option list
    @HostListener('document:click', ['$event'])
    public outsideClick(e: MouseEvent): void {
        if (this.wrapper && !this.wrapper.nativeElement.contains(e.target)) {
            this.showOptions = false;
        }
    }
}
