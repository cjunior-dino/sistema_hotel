import {Component, Injector} from '@angular/core';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {URLS} from '../../app/routes-api';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BaseComponentListDirective} from '../../shared/directive/base-component-list.directive';
import {Room} from '../../shared/models/room';
import {Check} from '../../shared/models/check';
import {Employee} from '../../shared/models/employee';
import {Reservation} from '../../shared/models/reservation';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.CHECK,
    retrieveOnInit: true,
    nextRouter:'/check'
}

@Component({
  selector: 'app-check',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})

export class CheckComponent extends BaseComponentListDirective<Check>{
    public displayedColumns: string[] = ['id','type', 'employee','reservation','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            reservation: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('reservation', this.formGroup.get('reservation')?.value ?? '');
        super.search();
    }

}

