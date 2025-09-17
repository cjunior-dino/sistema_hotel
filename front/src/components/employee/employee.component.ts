import {Component, OnInit} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe, formatCurrency, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../shared/models/employee';


// const ELEMENT_DATA: Employee[] = [
//     {id: 1, position: 'nivel1', created_at: new Date(), modified_at: new Date(), active: true},
//     {id: 2, position: 'nivel2', created_at: new Date(), modified_at: new Date(), active: true},
//     {id: 3, position: 'nivel3', created_at: new Date(), modified_at: new Date(), active: true},
//
// ];

@Component({
  selector: 'app-employee',
    imports: [
        MatTableModule,
        NgClass,
        MatCard,
        DatePipe,
        MatTable,

    ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})


export class EmployeeComponent implements OnInit {
//export class EmployeeComponent {
    public displayedColumns: string[] = ['id','created_at','modified_at','active','salary','level','position'];
    public dataSource :MatTableDataSource<Employee>= new MatTableDataSource();
    //public dataSource = new MatTableDataSource(ELEMENT_DATA);
    protected readonly formatCurrency = formatCurrency;

    constructor(public http: HttpClient) {
    }

    public ngOnInit() {
        this.getEmployee();
    }

    public getEmployee(): void {
        this.http.get<Employee[]>('http://localhost:8000/core/employee/')
            .subscribe((data: Employee[]) => {
                this.dataSource = new MatTableDataSource(data);
            });
    }

    // public deleteRoom(id: number) {
    //
    // }


}
