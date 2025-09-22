import {Component, Injector} from '@angular/core';
import {BaseComponentListDirective} from '../../shared/directive/base-component-list.directive';
import {Room} from '../../shared/models/room';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Payment} from '../../shared/models/payment';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {URLS} from '../../app/routes-api';
import {PaymentMethod} from '../../shared/models/payment-method';
import {Employee} from '../../shared/models/employee';
import {Reservation} from '../../shared/models/reservation';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.PAYMENT,
    retrieveOnInit: true,
    nextRouter:'/payment',
}


@Component({
  selector: 'app-payment',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})

export class PaymentComponent extends BaseComponentListDirective<Payment>{
    public displayedColumns: string[] = ['id','total_payment', 'type','discount','value_payment', 'payment_method','employee','reservation','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            payment_method: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('payment_method', this.formGroup.get('payment_method')?.value ?? '');
        super.search();
    }

}

