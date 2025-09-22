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

const BASE_OPTIONS: BaseComponentDetailOptions = {
    endpoint: URLS.ROOM,
    retrieveOnInit: true,
    nextRouter:'/room'
}

@Component({
  selector: 'app-room-detail',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard
    ],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.scss',
  standalone: true
})

export class RoomDetailComponent extends BaseComponentDetailDirective<Room>{

    public constructor(injector: Injector) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup(): void{
        this.formGroup = this.formBuilder.group({
            type_room: [null, Validators.required],
            description: [null, Validators.required],
            capacity: [null, Validators.required],
            daily_rate: [null, Validators.required],
        });
    }
}
