import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideClientHydration} from '@angular/platform-browser';
import {provideToastr} from 'ngx-toastr';

const  appearance : MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(),
        provideAnimations(),
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance},
        provideToastr()
    ]

};
