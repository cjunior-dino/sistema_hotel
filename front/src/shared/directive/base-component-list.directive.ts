import {Directive, InjectionToken, Injector, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BaseService} from "../service/base.service";
import {DialogDeleteConfirmComponent} from "../dialog-delete-confirm/dialog-delete-confirm.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface BaseComponentOptions {
    endpoint: string;
}

@Directive()
export abstract class BaseComponentListDirective<T> implements OnInit {
    public dataSource: MatTableDataSource<T>;
    public service: BaseService<T>;
    public http: HttpClient;
    public dialog: MatDialog;
    public formBuilder: FormBuilder;
    public formGroup: FormGroup;

    protected constructor(public injector: Injector, public options: BaseComponentOptions) {
        this.http = this.injector.get(HttpClient);
        this.dialog = this.injector.get(MatDialog);
        this.formBuilder = injector.get(FormBuilder);
        this.service = this.injector.get(this.serviceToken());
        this.dataSource = new MatTableDataSource<T>([]);
    }

    public serviceToken(): InjectionToken<BaseService<T>>{
        return new InjectionToken<BaseService<T>>(`service_${this.options.endpoint}`, {
            providedIn: 'root',
            factory: () => new BaseService<T>(this.http, this.options.endpoint)
        });
    }

    public ngOnInit(): void {
        this.createFormGroup();
        this.search();
    }

    public abstract createFormGroup(): void;

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
                        .subscribe(() => {
                            this.search();
                        });
                }
            });
    }
}
