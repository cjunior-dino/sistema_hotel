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
import {Position} from '../../../shared/models/position';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.POSITION,
    retrieveOnInit: true,
    nextRouter:'/position'
}

@Component({
  selector: 'app-position-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './position-detail.component.html',
  styleUrl: './position-detail.component.scss'
})
export class PositionDetailComponent extends BaseComponentDetailDirective<Position>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            function: [null, Validators.required],
            max_salary: [null, Validators.required],
            min_salary: [null, Validators.required],
        });
    }
}
