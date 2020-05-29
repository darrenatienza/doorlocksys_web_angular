import { Student } from '../../entities/student/student';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StudentService {






    src = 'students';
    config = new Config();

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
            .get<number>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getAll(criteria: string): Observable<Student[]> {
        const params = new HttpParams()
            .set('criteria', criteria);
        return this._http
            .get<Student[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    add(student: Student): Observable<number> {

        return this._http
            .post<number>(this.config.getAPIUrl('1', this.src), student
            );
    }
    edit(studentID: number, student: any): Observable<number> {
        const params = new HttpParams()
            .set('studentID', studentID.toString());
        return this._http
            .put<number>(this.config.getAPIUrl('1', this.src), student, { params }
            );
    }
    delete(studentID: number): Observable<boolean> {
        const params = new HttpParams()
            .set('studentID', studentID.toString());
        return this._http
            .delete<boolean>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getDetails(studentID: number): Observable<Student> {
        const params = new HttpParams()
            .set('studentID', studentID.toString());
        return this._http
            .get<Student>(this.config.getAPIUrl('1', this.src), { params }
            );
    }

    constructor(private _http: HttpClient) { }
}
