import {ModelBase} from './model-base';

export class User extends ModelBase {
    name?: string;
    dt_birth?: Date;
    cpf?: number;
    phone?: number;
    email?: string;
}
