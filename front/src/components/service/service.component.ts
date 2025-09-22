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
import {Service} from '../../shared/models/service';
import {Employee} from '../../shared/models/employee';
import {Reservation} from '../../shared/models/reservation';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.SERVICE,
    retrieveOnInit: true,
    nextRouter:'/service'
}

@Component({
  selector: 'app-service',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})

export class ServiceComponent extends BaseComponentListDirective<Service>{
    public displayedColumns: string[] = ['id','type', 'description','value','employee','reservation','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            description: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('description', this.formGroup.get('description')?.value ?? '');
        super.search();
    }

}
