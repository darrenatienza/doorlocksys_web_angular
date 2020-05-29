import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { Observable } from 'rxjs';
import { Student } from '../../entities/student';
import { HttpParams, HttpClient } from '@angular/common/http';
import { StudentReq } from '../../entities/student-services';


@Injectable({
    providedIn: 'root'
})
export class StudentReqService {


    src = 'studentreqs';
    config = new Config();

    changePrintReadyStatus(studentReqID: number, printReadyStatus: boolean): Observable<number> {
        const params = new HttpParams()
            .set('studentReqID', studentReqID.toString())
            .set('printReadyStatus', printReadyStatus.toString());
        return this._http
            .put<number>(this.config.getAPIUrl('1', this.src), null, { params }
            );
    }
    getAllByIsPrintReady(isprintReady: boolean) {
        const params = new HttpParams()
            .set('isPrintReady', isprintReady.toString());
        return this._http
            .get<Student[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }

    getStudent(srcode: string): Observable<Student> {
        const params = new HttpParams()
            .set('srcode', srcode);
        return this._http
            .get<Student>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getCount(): Observable<number> {
        const params = new HttpParams()
        .set('isGetCount', 'true');
        return this._http
            .get<number>(this.config.getAPIUrl('1', this.src),
            );
    }
    getAll(criteria: string): Observable<Student[]> {
        const params = new HttpParams()
            .set('criteria', criteria);
        return this._http
            .get<Student[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    add(studentReq: StudentReq): Observable<number> {
        return this._http
            .post<number>(this.config.getAPIUrl('1', this.src), studentReq
            );
    }
    edit(studentReqID: number, studentReq: StudentReq): Observable<number> {
        const params = new HttpParams()
            .set('studentReqID', studentReqID.toString());
        return this._http
            .put<number>(this.config.getAPIUrl('1', this.src), studentReq, { params }
            );
    }
    delete(studentReqID: number): Observable<boolean> {
        const params = new HttpParams()
            .set('studentReqID', studentReqID.toString());
        return this._http
            .delete<boolean>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getDetails(studentReqID: number): Observable<StudentReq> {
        const params = new HttpParams()
            .set('studentReqID', studentReqID.toString());
        return this._http
            .get<StudentReq>(this.config.getAPIUrl('1', this.src), { params }
            );
    }

    constructor(private _http: HttpClient) { }
}
