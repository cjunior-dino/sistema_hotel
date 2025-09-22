import {Component, Injector} from '@angular/core';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable,
    MatTableModule
} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {Room} from '../../shared/models/room';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {BaseComponentListDirective, BaseComponentOptions} from '../../shared/directive/base-component-list.directive';
import {URLS} from '../../app/routes-api';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {Employee} from '../../shared/models/employee';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.EMPLOYEE,
    retrieveOnInit: true,
    nextRouter:'/employee'
}
@Component({
    selector: 'app-employee',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],

    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
    standalone: true
})

export class EmployeeComponent extends BaseComponentListDirective<Employee>{
    public displayedColumns: string[] = ['id','salary', 'level','position','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            salary: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('salary', this.formGroup.get('salary')?.value ?? '');
        super.search();
    }

}
