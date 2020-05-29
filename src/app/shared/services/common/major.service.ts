import { Config } from './../shared/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Major } from '../../entities/common';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
    constructor(private _http: HttpClient) { }

    src = 'majors';
    config = new Config();

    getAll(courseID: number): Observable<Major[]> {
        const params = new HttpParams()
        .set('courseid', courseID.toString());
        return this._http
            .get<Major[]>(this.config.getAPIUrl('1', this.src), {params}
            );
    }
}
