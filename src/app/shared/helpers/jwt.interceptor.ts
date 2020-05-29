import { CurrentUser } from './../local-storage-manager/current-user';
import { environment } from './../../../environments/environment.prod';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { ErrorService, LoggingService, NotificationService } from './services';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    errorService;
    logger;
    notifier;

    constructor(public router: Router, private injector: Injector) {
        this.errorService = this.injector.get(ErrorService);
        this.logger = this.injector.get(LoggingService);
        this.notifier = this.injector.get(NotificationService);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        // const userGuid = new CurrentUser().userGuid;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    AccessType: `web`
                }
            });
        } else {
            this.router.navigate(['/login']);
        }

        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (event.body.error) {
                    if (event.body.error.status !== 108) {
                        this.notifier.showError(event.body.error.message);
                    }
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                    // redirect to the login route
                    // or show a modal
                }
            }
        }));
    }
}
