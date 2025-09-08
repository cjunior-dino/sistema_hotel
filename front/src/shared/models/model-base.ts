import {booleanAttribute, numberAttribute} from '@angular/core';
export class ModelBase {
    id?: number;
    created_at?: Date
    modified_at?: Date;
    active?: boolean;
}
