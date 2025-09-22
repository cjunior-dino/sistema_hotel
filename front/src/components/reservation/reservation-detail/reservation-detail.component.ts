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
import {Reservation} from '../../../shared/models/reservation';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.RESERVATION,
    retrieveOnInit: true,
    nextRouter:'/reservation'
}
@Component({
  selector: 'app-reservation-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.scss'
})
export class ReservationDetailComponent extends BaseComponentDetailDirective<Reservation>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            daily_value: [null, Validators.required],
            total_value: [null, Validators.required],
            dt_begin: [null, Validators.required],
            dt_end: [null, Validators.required],
            room: [null, Validators.required],
        });
    }
}
