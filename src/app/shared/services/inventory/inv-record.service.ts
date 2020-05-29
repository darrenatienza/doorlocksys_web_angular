
import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadOneInvRec, ReadAllInvRecord } from '../../entities';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class InvRecordService {

    constructor(private _http: HttpClient) { }

    src = 'invrecords';
    config = new Config();

    getAllByInvDetailID(invDetailID: number): Observable<ReadAllInvRecord[]> {
        const params = new HttpParams()
            .set('invDetailID', invDetailID.toString());
        return this._http
            .get<ReadAllInvRecord[]>(this.config.getAPIUrl('1_1_1', this.src), { params }
            );
    }
    checkIfExists(propNum: string, invRecordID: number): Observable<any> {
        const params = new HttpParams()
        .set('propNum', propNum)
        .set('invRecordID', invRecordID.toString());
        return this._http
            .get<any>(this.config.getAPIUrl('1_1', this.src), { params }
            );
    }
    getCountByQtyInv(qtyInvID: any): Observable<number> {
        const params = new HttpParams()
            .set('IsGetCountByQtyInvID', 'true')
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .get<number>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    genEquipNum(invTypeID: any) {
        const params = new HttpParams()
            .set('IsGenEquipNum', 'true')
            .set('invTypeID', invTypeID.toString());
        return this._http
            .get<string>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    delete(invRecordID: number) {
        const params = new HttpParams()
            .set('invRecordID', invRecordID.toString());
        return this._http
            .delete<ReadOneInvRec>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    edit(invRecordID: any, invRecord: ReadOneInvRec): Observable<Guid> {
        const params = new HttpParams()
            .set('invRecordID', invRecordID.toString());
        return this._http
            .put<Guid>(this.config.getAPIUrl('1_2', this.src), invRecord, { params }
            );
    }
    getAllV1(criteria: string, status: string, type: string, location: string): Observable<ReadAllInvRecord[]> {
        const params = new HttpParams()
            .set('criteria', criteria)
            .set('status', status)
            .set('type', type)
            .set('location', location);
        return this._http
            .get<ReadAllInvRecord[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    // Use for print and list listing records in version 1_2
    getAllV1_2(criteria: string, status: string, type: string, location: string): Observable<ReadAllInvRecord[]> {
        const params = new HttpParams()
            .set('criteria', criteria)
            .set('status', status)
            .set('type', type)
            .set('location', location);
        return this._http
            .get<ReadAllInvRecord[]>(this.config.getAPIUrl('1_2', this.src), { params }
            );
    }
    get(invRecordID: number): Observable<ReadOneInvRec> {
        const params = new HttpParams()
            .set('invRecordID', invRecordID.toString());
        return this._http
            .get<ReadOneInvRec>(this.config.getAPIUrl('1_2', this.src), { params }
            );
    }
    getAll(criteria: string, qtyInvID: number): Observable<ReadAllInvRecord[]> {
        const params = new HttpParams()
            .set('criteria', criteria)
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .get<ReadAllInvRecord[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getAllByCriteria(criteria: string): Observable<ReadAllInvRecord[]> {
        const params = new HttpParams()
            .set('criteria', criteria);
        return this._http
            .get<ReadAllInvRecord[]>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    add(invRecord: ReadOneInvRec): Observable<Guid> {
        return this._http
            .post<Guid>(this.config.getAPIUrl('1_2', this.src), invRecord
            );
    }
}
