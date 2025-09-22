import {Component, Injector} from '@angular/core';
import {Room} from '../../../shared/models/room';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    BaseComponentDetailDirective,
    BaseComponentDetailOptions
} from '../../../shared/directive/base-component-detail.directive';
import {URLS} from '../../../app/routes-api';
import {MatButtonModule, MatFabButton} from '@angular/material/button';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCard} from '@angular/material/card';
import {Employee} from '../../../shared/models/employee';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.EMPLOYEE,
    retrieveOnInit: true,
    nextRouter:'/employee'
}

@Component({
    selector: 'app-employee-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
    templateUrl: './employee-detail.component.html',
    styleUrl: './employee-detail.component.scss',
    standalone: true
})

export class EmployeeDetailComponent extends BaseComponentDetailDirective<Employee>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            salary: [null, Validators.required],
            level: [null, Validators.required],
            position: [null, Validators.required],
        });
    }
}
