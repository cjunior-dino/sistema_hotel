import {Component, Injector} from '@angular/core';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {URLS} from '../../app/routes-api';
import {BaseComponentListDirective} from '../../shared/directive/base-component-list.directive';
import {Room} from '../../shared/models/room';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Reservation} from '../../shared/models/reservation';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableModule
} from '@angular/material/table';
import {MatButtonModule, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'


const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.RESERVATION,
    retrieveOnInit: true,
    nextRouter:'/reservation',
}

@Component({
  selector: 'app-reservation',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})

export class ReservationComponent extends BaseComponentListDirective<Reservation>{
    public displayedColumns: string[] = ['id','daily_value', 'total_value','dt_begin','dt_end','room','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            dt_begin: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('dt_begin', this.formGroup.get('dt_begin')?.value ?? '');
        super.search();
    }

}
