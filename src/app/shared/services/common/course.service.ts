import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../entities/common';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private _http: HttpClient) { }
    src = 'courses';
    config = new Config();

    getAll(collegeID: number): Observable<Course[]> {
        const params = new HttpParams()
            .set('collegeID', collegeID.toString());
        return this._http
            .get<Course[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
}
