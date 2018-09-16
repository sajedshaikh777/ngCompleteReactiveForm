import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ValidateUrl } from '../app/shared/url.validator';

@Component({
    selector: 'app-complete-reactive-form',
    templateUrl: 'complete-reactive-form.component.html',
    styleUrls: ['complete-reactive-form.component.css'],
    providers: [CurrencyPipe]
})
export class CompleteReactiveFormComponent implements OnInit {

    formattedAmount = '0';
    value: any;

    constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) { }

    public profileForm: any;

    ngOnInit() {
        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            lastName: ['', Validators.required],
            websiteUrl: ['', [Validators.required, ValidateUrl]],
            amount: ['', Validators.required],
            recurring: ['', Validators.required],
            address: this.fb.group({
                street: [''],
                city: [''],
                state: [''],
                zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$'), Validators.minLength(6)]]
            }),

            aliases: this.fb.array([
                this.fb.control('')
            ]),
        });
    }

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.fb.control(''));
    }

    removeAlias(index: number) {
        this.aliases.removeAt(index);
    }

    onSubmit() {
        console.warn(this.profileForm);
    }

}
