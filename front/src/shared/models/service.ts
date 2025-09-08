import {ModelBase} from './model-base';
import {Employee} from './employee';
import {Reservation} from './reservation';


export class Service extends ModelBase{

    //TypeService: number;   verificar a necessidade de ser incluido ou não esse Choice e o tipo do mesmo
    type?: number;
    value?: number;
    description?: string;
    employee?: number | string | Employee;
    reservation?: number | string | Reservation;

}
