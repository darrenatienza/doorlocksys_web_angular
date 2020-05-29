import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DeviceActionService {

    src = 'deviceaction';
    url = environment.url;

    getAll(): Observable<any> {
        const body = { src: this.src, name: 'getall', param: {} };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }}));
    }
    updateActiveStatus(id): Observable<any> {
        const body = { src: this.src, name: 'updateactivestatus', param: { id: id } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                } }));
    }
    getActiveDeviceAction(): Observable<any> {
        const body = { src: this.src, name: 'getActiveDeviceAction', param: { } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }

    constructor(private _http: HttpClient) { }
}
