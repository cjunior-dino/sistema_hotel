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
import {Payment} from '../../../shared/models/payment';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.PAYMENT,
    retrieveOnInit: true,
    nextRouter:'/payment'
}

@Component({
  selector: 'app-payment-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.scss'
})
export class PaymentDetailComponent extends BaseComponentDetailDirective<Payment>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            total_payment: [null, Validators.required],
            type: [null, Validators.required],
            discount: [null, Validators.required],
            value_payment: [null, Validators.required],
            payment_method: [null, Validators.required],
            employee: [null, Validators.required],
            reservation: [null, Validators.required],
        });
    }
}
