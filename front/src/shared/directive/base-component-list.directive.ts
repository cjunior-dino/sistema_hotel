// import {Directive, Injector, OnInit} from '@angular/core';
// import {MatTableDataSource} from "@angular/material/table";
// import {DialogDeleteConfirmComponent} from "../dialog-delete-confirm/dialog-delete-confirm.component";
// import {MatDialog} from "@angular/material/dialog";
// import {BaseComponentDirective} from './base-component.directive';
//
// export interface BaseComponentOptions {
//     endpoint: string;
// }
//
// @Directive()
// export abstract class BaseComponentListDirective<T> extends BaseComponentDirective<T> implements OnInit {
//     public dataSource: MatTableDataSource<T>;
//     public dialog: MatDialog;
//
//
//     protected constructor(injector: Injector, options: BaseComponentOptions) {
//         super(injector, options);
//         this.dialog = injector.get(MatDialog);
//         this.dataSource = new MatTableDataSource<T>([]);
//     }
//
//     public override ngOnInit(): void {
//         super.ngOnInit();
//         this.search();
//     }
//
//     public search(): void {
//         this.service.getAll().subscribe((data: T[]) => {
//             this.dataSource = new MatTableDataSource(data);
//         });
//     }
//
//     public delete(id: number): void {
//         this.dialog.open(DialogDeleteConfirmComponent)
//             .afterClosed()
//             .subscribe((result: boolean) => {
//                 if (result) {
//                     this.service.delete(id)
//                         .subscribe({
//                             next: () => {
//                                 this.toast.success('Deletado com sucesso!', 'Sucesso');
//                             },
//                             error: (err) => {
//                                 this.toast.error(err?.error?.message ?? 'Erro ao deletar', 'Error');
//                             },
//                             complete: () => {
//                                 this.search()
//                             }
//                         });
//                 }
//             });
//     }
// }
import {Directive, Injector, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogDeleteConfirmComponent} from "../dialog-delete-confirm/dialog-delete-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {BaseComponentDirective} from './base-component.directive';

export interface BaseComponentOptions {
    endpoint: string;
}

@Directive()
export abstract class BaseComponentListDirective<T> extends BaseComponentDirective<T> implements OnInit {
    public dataSource: MatTableDataSource<T>;
    public dialog: MatDialog;

    protected constructor(injector: Injector, public options: BaseComponentOptions) {
        super(injector, options.endpoint);
        this.dialog = injector.get(MatDialog);
        this.dataSource = new MatTableDataSource<T>([]);
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.search();
    }

    public search(): void {
        this.service.getAll().subscribe((data: T[]) => {
            this.dataSource = new MatTableDataSource(data);
        });
    }

    public delete(id: number): void {
        this.dialog.open(DialogDeleteConfirmComponent)
            .afterClosed()
            .subscribe((result: boolean) => {
                if (result) {
                    this.service.delete(id)
                        .subscribe({
                                next: () => {
                                    this.toast.success('Deletado com sucesso', 'Sucesso');
                                },
                                error: (err) => {
                                    this.toast.error(err?.error?.message ?? 'Erro ao deletar', 'Erro');
                                },
                                complete: () => {
                                    this.search();
                                }
                            }
                        );
                }
            });
    }

}
