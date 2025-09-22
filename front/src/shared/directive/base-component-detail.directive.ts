// import {Directive, Injector} from '@angular/core';
// import {BaseComponentDirective, BaseComponentOptions} from './base-component.directive';
//
// export interface BaseComponentDetailOptions extends BaseComponentOptions {
// }
//
// @Directive()
// export abstract class BaseComponentDetailDirective<T> extends BaseComponentDirective<T>{
//     public object: T = {} as T;
//     protected constructor(injector: Injector, options: BaseComponentDetailOptions) {
//         super(injector, options);
//     }
// }
import {Directive, Injector} from '@angular/core';
import {BaseComponentOptions} from './base-component-list.directive';
import {BaseComponentDirective} from './base-component.directive';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

export interface BaseComponentDetailOptions extends BaseComponentOptions {
    retrieveOnInit?: boolean;
    nextRouter?: string;
}

export const EVENT = {
    RETRIEVE: 0,
    SAVE: 1,
    UPDATE: 2,
    DELETE: 3
}

export const handler = (event: number, callback?: (event: number) => void): void => {
    if (callback) {
        callback(event);
    }
}

@Directive()
export abstract class BaseComponentDetailDirective<T> extends BaseComponentDirective<T> {
    public object: T = {} as T;
    public activatedRoute: ActivatedRoute;

    protected constructor(injector: Injector, public options: BaseComponentDetailOptions) {
        super(injector, options.endpoint);
        this.activatedRoute = this.injector.get(ActivatedRoute);
    }

    override ngOnInit(callback?: () => void) {
        super.ngOnInit();
        if (this.options.retrieveOnInit) {
            this.retrieve();
        } else {
            handler(EVENT.RETRIEVE, callback);
        }
    }

    public beforeRetrieve(): Observable<number | string> {
        return this.activatedRoute.params.pipe(
            take(1),
            map((params: Params) => {
                const id = params['action'];
                return id && id !== 'create' ? id : null;
            })
        );
    }

    public retrieve(callback?: () => void): void {
        this.service.clearParameter();
        this.beforeRetrieve()
            .pipe(
                take(1),
                switchMap((id: number | string) => {
                    if (id) {
                        return this.service.getById(id).pipe(take(1));
                    }
                    return of(null);
                })
            ).subscribe((response: T) => {
                this.object = response;
                if (this.formGroup) {
                    this.formGroup.reset(this.object);
                }
                handler(EVENT.RETRIEVE, callback);
            }
        );
    }

    //Funcao para salvar ou atualizar o formulario
    public saveOrUpdateForm(callback?: (event: number) => void): void {
        if (!this.formGroup.valid) return;
        // Get data to save or update
        let data: {} = {};
        Object.keys(this.formGroup.getRawValue()).forEach((key: string): void => {
            const value = this.formGroup.getRawValue()[key];
            if (value !== null && value !== undefined) {
                data[key] = value;
            }
        });

        this._saveOrUpdateData(data, callback);
    }

    private _saveOrUpdateData(
        data: object | T | FormData,
        callback?: (event: number) => void,
    ): void {
        // Save or update according ID
        if (this.object?.['id']) {
            this.service
                .update(this.object['id'], data)
                .pipe(take(1))
                .subscribe((response) => {
                    this.toast.success('Sucesso', 'Atualizado com sucesso');
                    this.object = response;
                    if (this.options.nextRouter) {
                        this.goToPage(this.options?.nextRouter);
                    } else if (this.formGroup) {
                        this.formGroup.reset(this.object);
                    }
                    handler(EVENT.UPDATE, callback);
                });
        } else {
            this.service
                .save(data as T)
                .pipe(take(1))
                .subscribe((response) => {
                    this.toast.success('Sucesso', 'Salvo com sucesso');
                    this.object = response;

                    if (this.options.nextRouter) {
                        this.goToPage(this.options?.nextRouter);
                    } else if (this.formGroup) {
                        this.formGroup.reset(this.object);
                    }
                    handler(EVENT.SAVE, callback);
                });
        }
    }


}
