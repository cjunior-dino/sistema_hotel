import {ModelBase} from './model-base';
import {Room} from './room';


export class Reservation extends ModelBase{
    daily_value?: number;
    total_value?: number;
    dt_begin?: Date;
    dt_end?: Date;
    room?: number | string | Room;
    //client?: number | string | Client; Verificar a criação dessa classe
}



