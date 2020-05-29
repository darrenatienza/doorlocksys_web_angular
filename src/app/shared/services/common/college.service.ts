import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared';
import { College } from '../../entities/common';

@Injectable({
    providedIn: 'root'
})
export class CollegeService {
    constructor(private _http: HttpClient) { }

    src = 'colleges';
    config = new Config();
    getAll(): Observable<College[]> {
        return this._http
            .get<College[]>(this.config.getAPIUrl('1', this.src)
            );
    }
}
