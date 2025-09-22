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
import {Service} from '../../../shared/models/service';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.SERVICE,
    retrieveOnInit: true,
    nextRouter:'/service'
}

@Component({
  selector: 'app-service-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent extends BaseComponentDetailDirective<Service>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            type: [null, Validators.required],
            description: [null, Validators.required],
            valor: [null, Validators.required],
            employee: [null, Validators.required],
            reservation: [null, Validators.required],
        });
    }
}
