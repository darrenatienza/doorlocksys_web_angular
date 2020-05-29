import { StudentReqType } from './../../entities/common/studentReqType';
import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentReqTypeService {

    constructor(private _http: HttpClient) { }
    src = 'studentreqtypes';
    config = new Config();

    getAll(criteria: string): Observable<StudentReqType[]> {
        const params = new HttpParams()
        .set('criteria', criteria.toString());
        return this._http
            .get<StudentReqType[]>(this.config.getAPIUrl('1', this.src), {params}
            );
    }
}
