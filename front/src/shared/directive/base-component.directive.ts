// import {Directive, InjectionToken, Injector, OnInit} from '@angular/core';
// import {BaseService} from '../service/base.service';
// import {ToastrService} from 'ngx-toastr';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {HttpClient} from '@angular/common/http';
// import {Router} from '@angular/router';
//
// export interface BaseComponentOptions {
//     endpoint: string;
// }
//
// @Directive()
// export abstract class BaseComponentDirective<T> implements OnInit {
//     public service: BaseService<T>;
//     public toast: ToastrService;
//     public formBuilder: FormBuilder;
//     public formGroup: FormGroup;
//     public http: HttpClient;
//     public router: Router;
//
//     protected constructor(public injector: Injector, public endpoint: string) {
//         this.http = this.injector.get(HttpClient);
//         this.formBuilder = injector.get(FormBuilder);
//         this.toast = injector.get(ToastrService);
//         this.service = this.injector.get(this.serviceToken())
//         this.router = this.injector.get(Router);
//     }
//     public serviceToken(): InjectionToken<BaseService<T>>{
//         return new InjectionToken<BaseService<T>>(`service_${this.endpoint}`, {
//             providedIn: 'root',
//             factory: () => new BaseService<T>(this.http, this.endpoint)
//         });
//     }
//     public ngOnInit(): void {
//         this.createFormGroup();
//     }
//     public abstract createFormGroup(): void;
//
//     public goToPage(route: string) {
//         this.router.navigate([route]).then();
//     }
//
// }

import {Directive, InjectionToken, Injector, OnInit} from '@angular/core';
import {BaseService} from '../service/base.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

export interface BaseComponentOptions {
    endpoint: string;
}

@Directive()
export abstract class BaseComponentDirective<T> implements OnInit {
    public service: BaseService<T>;

    public http: HttpClient;

    public formBuilder: FormBuilder;
    public formGroup: FormGroup;
    public toast: ToastrService;
    public router: Router;

    protected constructor(public injector: Injector, public endpoint: string) {
        this.http = this.injector.get(HttpClient);
        this.formBuilder = injector.get(FormBuilder);
        this.toast = injector.get(ToastrService);
        this.service = this.injector.get(this.serviceToken());
        this.router = injector.get(Router);
    }

    public serviceToken(): InjectionToken<BaseService<T>> {
        return new InjectionToken<BaseService<T>>(`service_${this.endpoint}`, {
            providedIn: 'root',
            factory: () => new BaseService<T>(this.http, this.endpoint)
        });
    }

    public createService<K>(_model: new () => K, path: string): BaseService<K> {
        const TOKEN = new InjectionToken<BaseService<K>>('service_' + path, {
            providedIn: 'root',
            factory: () => new BaseService<K>(this.http, path),
        });
        return this.injector.get(TOKEN);
    }

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public abstract createFormGroup(): void;

    public goToPage(route: string): void {
        this.router.navigate([route]).then();
    }

    public get f() {
        return this.formGroup.controls;
    }

    // Convenience getter for easy access to form fields values
    public get v() {
        return this.formGroup.value;
    }

    // Convenience getter for easy access to form fields raw values
    public get rv() {
        return this.formGroup.getRawValue();
    }

}
