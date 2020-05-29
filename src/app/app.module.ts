import { SharedDirectivesModule } from './shared/directives/shared-directives.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, OfficeService, CategoryService, AuthService, SharedPipesModule } from './shared';
import { JwtInterceptor, GlobalErrorHandler } from './shared/helpers';
import { MultiFilterPipe } from './shared/pipes/multi-filter.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxLoggerLevel, LoggerModule } from 'ngx-logger';





// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        SharedDirectivesModule,
        LoadingBarHttpClientModule,

        // for Http use:
         LoadingBarHttpModule,

        // for Router use:
         LoadingBarRouterModule,

        // for HttpClient use:
         LoadingBarHttpClientModule,

        // for Core use:
         LoadingBarModule,
        SharedPipesModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoggerModule.forRoot(
            {serverLoggingUrl: 'http://localhost:39048/api/v1/logs',
            level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.INFO}),
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,
        CategoryService,
        OfficeService,
        AuthService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
         },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }],
    bootstrap: [AppComponent]
})
export class AppModule {}
