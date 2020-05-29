import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private _http: HttpClient) { }

    src = 'category';
    config = new Config();
    getAll(): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({ 'src': this.src, 'name': 'getAll', 'param': {} });
        return this._http
            .post<any>(this.config.getAPIUrl('1', this.src),
                body,
                httpOptions);
    }
}
