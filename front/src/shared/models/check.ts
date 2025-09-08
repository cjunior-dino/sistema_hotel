
import {ModelBase} from './model-base';
import {Employee} from './employee';
import {Reservation} from './reservation';

export class Check extends ModelBase {
    //TypeCheck?: number; verificar a necessidade de ser incluido ou não esse Choice e o tipo do mesmo
    type?: number;
    employee?: number | string | Employee;
    reservation?: number | string | Reservation;
}
