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
import {User} from '../../../shared/models/user';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.ACCOUNTS,
    retrieveOnInit: true,
    nextRouter:'/users'
}
@Component({
  selector: 'app-user-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent extends BaseComponentDetailDirective<User>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            dt_birth: [null, Validators.required],
            cpf: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required],
            username: [null, Validators.required],
        });
    }
}

