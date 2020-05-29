import { User } from './../../entities/admin/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../shared';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {



    src = 'user';
    url = environment.url;
    getAllBy(criteria: string): Observable<any> {
       
        const body = { src: this.src, name: 'getall', param: { 'criteria': criteria } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            })
            );
    }
    getAll(): Observable<any> {
        const body = { src: this.src, name: 'getall', param: {} };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }
    getBy(userID): Observable<any> {
        const body = { src: this.src, name: 'getByUserID', param: { id: userID } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }
    add(value: any): Observable<number> {

        const body = { src: this.src, name: 'add', param: value };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }

    edit(userID: number, value: any): Observable<any> {
        const body = { src: this.src, name: 'edit', param: value };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }
    editUser(value: any): Observable<any> {
        const body = { src: this.src, name: 'edit', param: value };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }

    getCurrentUser(): Observable<any> {
        const body = { src: this.src, name: 'getCurrentUser', param: {} };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }
   
    delete(userid: any) {
        const body = { src: this.src, name: 'delete', param: { id: userid } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                }
            }));
    }
    resetFinger(userid: any) {
        const body = { src: this.src, name: 'resetFinger', param: { id: userid } };
        return this._http
            .post<any>(this.url, body)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result;
                } else {
                    console.log(data.error.message);
                }
            }));
    }
    constructor(private _http: HttpClient) { }
}
