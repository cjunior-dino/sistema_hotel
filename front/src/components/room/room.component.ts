import {Component, Injector} from '@angular/core';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable,
    MatTableModule
} from '@angular/material/table';
import {DatePipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {Room} from '../../shared/models/room';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {BaseComponentListDirective, BaseComponentOptions} from '../../shared/directive/base-component-list.directive';
import {URLS} from '../../app/routes-api';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const BASE_OPTIONS = {
    endpoint: URLS.ROOM,
    retrieveOnInit: true,
    nextRouter:'/room'
}
@Component({
  selector: 'app-room',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCard,
        MatIcon,
        MatTable,
        DatePipe,
        NgClass,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderCellDef,
        MatCellDef
    ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})

export class RoomComponent extends BaseComponentListDirective<Room>{
    public displayedColumns: string[] = ['id','type_room', 'description','capacity','daily_rate','created_at','modified_at','active','actions']

    constructor(
        injector: Injector
    ) {
        super(injector, BASE_OPTIONS);
    }

    public createFormGroup():void {
        this.formGroup = this.formBuilder.group({
            id: [null, Validators.required],
        });
    }

    public override search() {
        this.service.clearParameter();
        this.service.addParameter('id', this.formGroup.get('id')?.value ?? '');
        super.search();
    }

}



//
// export class RoomComponent implements OnInit {
// //export class RoomComponent {
//     public displayedColumns: string[] = ['id','type_room', 'description','capacity','daily_rate','created_at','modified_at','active','actions']
//     public dataSource :MatTableDataSource<Room>= new MatTableDataSource();
//     //public dataSource = new MatTableDataSource(ELEMENT_DATA);
//     protected readonly formatCurrency = formatCurrency;
//
//     public service: BaseService<Room>;
//
//     constructor(
//         public http: HttpClient,
//         public dialog: MatDialog
//     ) {
//         this.service = new BaseService<Room>(http, URLS.ROOM)
//     }
//
//
//
//     public ngOnInit() {
//         this.getALL();
//     }
//
//     public getALL(): void {
//         this.service.getAll().subscribe((data: Room[]) => {
//             this.dataSource = new MatTableDataSource(data);
//         });
//     }
//
//     public delete(id: number) {
//         this.dialog.open(DialogDeleteConfirmComponent)
//             .afterClosed()
//             .subscribe((result: boolean) => {
//                 if (result) {
//                     this.service.delete(id)
//                         .subscribe(() =>{
//                             this.getALL();
//                         });
//                 }
//             });
//     };
//
//
//     // protected readonly identity = identity;
// }
