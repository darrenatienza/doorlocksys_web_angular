import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Config } from '../shared';
import { InvDetail } from '../../entities';

@Injectable({
    providedIn: 'root'
})
export class InvDetailService {

    constructor(private _http: HttpClient) { }

    src = 'invdetails';
    config = new Config();

    delete(invDetailID: number) {
        const params = new HttpParams()
            .set('invDetailID', invDetailID.toString());
        return this._http
            .delete<InvDetail>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    edit(invDetailID: any, invDetail: InvDetail): Observable<number> {
        const params = new HttpParams()
            .set('invDetailID', invDetailID.toString());
        return this._http
            .put<number>(this.config.getAPIUrl('1_1', this.src), invDetail, { params }
            );
    }

    get(invDetailID: number): Observable<InvDetail> {
        const params = new HttpParams()
            .set('invDetailID', invDetailID.toString());
        return this._http
            .get<InvDetail>(this.config.getAPIUrl('1_1', this.src), { params }
            );
    }
    getAll(criteria: string, type: string) {
        const params = new HttpParams()
            .set('criteria', criteria)
            .set('type', type);
        return this._http
            .get<InvDetail[]>(this.config.getAPIUrl('1_1', this.src), { params }
            );
    }
    getAllByInvTypeID(invTypeID: number): Observable<InvDetail[]> {
        const params = new HttpParams()
            .set('invTypeID', invTypeID.toString());
        return this._http
            .get<InvDetail[]>(this.config.getAPIUrl('1_2', this.src), { params }
            );
    }
    add(invDetail: InvDetail): Observable<number> {
        return this._http
            .post<number>(this.config.getAPIUrl('1_1', this.src), invDetail
            );
    }
}
