import {Routes} from '@angular/router';
import {ReservationComponent} from '../components/reservation/reservation.component';
import {RoomComponent} from '../components/room/room.component';
import {EmployeeComponent} from '../components/employee/employee.component';
import {RoomDetailComponent} from '../components/room/room-detail/room-detail.component';
import {ReservationDetailComponent} from '../components/reservation/reservation-detail/reservation-detail.component';
import {EmployeeDetailComponent} from '../components/employee/employee-detail/employee-detail.component';
import {UserDetailComponent} from '../components/user/user-detail/user-detail.component';
import {UserComponent} from '../components/user/user.component';
import {Service} from '../shared/models/service';
import {ServiceComponent} from '../components/service/service.component';
import {ServiceDetailComponent} from '../components/service/service-detail/service-detail.component';
import {Position} from '../shared/models/position';
import {PositionComponent} from '../components/position/position.component';
import {PositionDetailComponent} from '../components/position/position-detail/position-detail.component';
import {Check} from '../shared/models/check';
import {CheckComponent} from '../components/check/check.component';
import {CheckDetailComponent} from '../components/check/check-detail/check-detail.component';
import {Payment} from '../shared/models/payment';
import {PaymentComponent} from '../components/payment/payment.component';
import {PaymentDetailComponent} from '../components/payment/payment-detail/payment-detail.component';
import {
    PaymentMethodDetailComponent
} from '../components/payment-method/payment-method-detail/payment-method-detail.component';
import {PaymentMethodComponent} from '../components/payment-method/payment-method.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/:action',
        component: UserDetailComponent
    },
    {
        path: 'service',
        component: ServiceComponent
    },
    {
        path: 'service/:action',
        component: ServiceDetailComponent
    },
    {
        path: 'room',
        component: RoomComponent
    },
    {
        path: 'room/:action',
        component: RoomDetailComponent
    },
    {
        path: 'reservation',
        component: ReservationComponent
    },
    {
        path: 'reservation/:action',
        component: ReservationDetailComponent
    },
    {
        path: 'position',
        component: PositionComponent
    },
    {
        path: 'position/:action',
        component: PositionDetailComponent
    },
    {
        path: 'payment-method',
        component: PaymentMethodComponent
    },
    {
        path: 'payment-method/:action',
        component: PaymentMethodDetailComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'payment/:action',
        component: PaymentDetailComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent
    },
    {
        path: 'employee/:action',
        component: EmployeeDetailComponent
    },
    {
        path: 'check',
        component: CheckComponent
    },
    {
        path: 'check/:action',
        component: CheckDetailComponent
    }

];
