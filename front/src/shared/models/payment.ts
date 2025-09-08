import {ModelBase} from './model-base';
import {Reservation} from './reservation';
import {Employee} from './employee';
import {PaymentMethod} from './paymentMethod';

export class Payment extends ModelBase{
    //TypePayment?: number; verificar a necessidade de ser incluido ou não esse Choice e o tipo do mesmo
    total_payment?: number;
    type?: number;
    discount?: number;
    value_payment?: number;
    payment_method?: number | string | PaymentMethod
    employee?: number | string | Employee
    reservation?: number | string | Reservation

}
