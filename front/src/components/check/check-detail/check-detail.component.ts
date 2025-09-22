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
import {Check} from '../../../shared/models/check';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.CHECK,
    retrieveOnInit: true,
    nextRouter:'/check'
}

@Component({
  selector: 'app-check-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './check-detail.component.html',
  styleUrl: './check-detail.component.scss'
})
export class CheckDetailComponent extends BaseComponentDetailDirective<Check>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            type: [null, Validators.required],
            employee: [null, Validators.required],
            reservation: [null, Validators.required],
        });
    }
}
