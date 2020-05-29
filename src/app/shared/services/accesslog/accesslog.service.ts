import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccesslogService {

    src = 'token';
    url = environment.url;

    getAll(date, criteria): Observable<any> {
        const body = { src: 'accesslog', name: 'getall', param: { date: date, criteria: criteria } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }}));
    }


    constructor(private _http: HttpClient) { }
}
