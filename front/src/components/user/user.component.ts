import {Component, Injector} from '@angular/core';
import {BaseComponentDetailOptions} from '../../shared/directive/base-component-detail.directive';
import {URLS} from '../../app/routes-api';
import {BaseComponentListDirective} from '../../shared/directive/base-component-list.directive';
import {User} from '../../shared/models/user';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.ACCOUNTS,
    retrieveOnInit: true,
    nextRouter:'/users'
}
@Component({
  selector: 'app-user',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent extends BaseComponentListDirective<User>{
    public displayedColumns: string[] = ['id','name', 'dt_birth','cpf','phone','email','created_at','modified_at','active','actions','username', 'password']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
            name: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        this.service.addParameter('name', this.formGroup.get('name')?.value ?? '');
        super.search();
    }

}
