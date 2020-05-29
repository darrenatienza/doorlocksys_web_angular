import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared';


@Injectable({
    providedIn: 'root'
})
export class OfficeService {

    constructor(private _http: HttpClient) { }

    src = 'office';
    config = new Config();
    getAll(): Observable<any> {
        return this._http
            .get<any>(this.config.getAPIUrl('1', this.src)
            );
    }
}
