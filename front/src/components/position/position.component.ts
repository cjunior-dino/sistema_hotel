import {Component, Injector} from '@angular/core';
import {BaseComponentListDirective} from '../../shared/directive/base-component-list.directive';
import {Room} from '../../shared/models/room';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {URLS} from '../../app/routes-api';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Position} from '../../shared/models/position';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.POSITION,
    retrieveOnInit: true,
    nextRouter:'/position'
}

@Component({
  selector: 'app-position',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})

export class PositionComponent extends BaseComponentListDirective<Position>{
    public displayedColumns: string[] = ['id','function', 'max_salary','min_salary','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            function: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('function', this.formGroup.get('function')?.value ?? '');
        super.search();
    }

}
