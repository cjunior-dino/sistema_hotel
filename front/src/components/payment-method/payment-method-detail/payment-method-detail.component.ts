import {Component, Injector} from '@angular/core';
import {
    BaseComponentDetailDirective,
    BaseComponentDetailOptions
} from '../../../shared/directive/base-component-detail.directive';
import {URLS} from '../../../app/routes-api';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {Room} from '../../../shared/models/room';
import {PaymentMethod} from '../../../shared/models/payment-method';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.PAYMENT_METHOD,
    retrieveOnInit: true,
    nextRouter:'/payment_method'
}

@Component({
  selector: 'app-payment-method-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './payment-method-detail.component.html',
  styleUrl: './payment-method-detail.component.scss'
})
export class PaymentMethodDetailComponent extends BaseComponentDetailDirective<PaymentMethod>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
        });
    }
}
