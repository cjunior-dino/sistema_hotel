import {Routes} from '@angular/router';
import {ReservationComponent} from '../components/reservation/reservation.component';
import {RoomComponent} from '../components/room/room.component';
import {EmployeeComponent} from '../components/employee/employee.component';

export const routes: Routes = [
    {
        path: 'reservation',
        component: ReservationComponent
    },
    {
        path: 'room',
        component: RoomComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent
    }

];
