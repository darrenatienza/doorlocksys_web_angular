import { ReadOneQtyInv, ReadAllQtyInv } from './../../entities/inventory/qty-inv';
import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { Observable } from 'rxjs';
import { Student } from '../..';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QtyInvService {

    constructor(private _http: HttpClient) { }

    src = 'qtyinvs';
    config = new Config();

    getAllV1_4(status: any, type: any, location: any): Observable<ReadAllQtyInv[]> {
        const params = new HttpParams()
            .set('type', type)
            .set('location', location)
            .set('status', status);
        return this._http
            .get<ReadAllQtyInv[]>(this.config.getAPIUrl('1_4', this.src), { params }
            );
    }
    async getAllV1_4_1(status: any, type: any, location: any) {
        const params = new HttpParams()
            .set('type', type)
            .set('location', location)
            .set('status', status);
        return await this._http
            .get<ReadAllQtyInv[]>(this.config.getAPIUrl('1_4', this.src), { params }
            ).toPromise();
    }
    delete(qtyInvID: number) {
        const params = new HttpParams()
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .delete<ReadOneQtyInv>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    edit(qtyInvID: any, qtyInv: ReadOneQtyInv): Observable<number> {
        const params = new HttpParams()
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .put<number>(this.config.getAPIUrl('1', this.src), qtyInv, { params }
            );
    }

    get(qtyInvID: number): Observable<ReadOneQtyInv> {
        const params = new HttpParams()
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .get<ReadOneQtyInv>(this.config.getAPIUrl('1', this.src), { params }
            );
    }
    getQuantityDetails(qtyInvID: number): Observable<ReadAllQtyInv> {

        const params = new HttpParams()
            .set('qtyInvID', qtyInvID.toString());
        return this._http
            .get<ReadAllQtyInv>(this.config.getAPIUrl('1_1', this.src), { params }
            );
    }
    getAllV1_2(criteria: string): Observable<ReadAllQtyInv[]> {
        const params = new HttpParams()
            .set('criteria', criteria);
        return this._http
            .get<ReadAllQtyInv[]>(this.config.getAPIUrl('1_2', this.src), { params }
            );
    }
    getAllV1_3(type: string, location: string, status: string): Observable<ReadAllQtyInv[]> {
        const params = new HttpParams()
            .set('type', type)
            .set('location', location)
            .set('status', status);
        return this._http
            .get<ReadAllQtyInv[]>(this.config.getAPIUrl('1_3', this.src), { params }
            );
    }
    add(qtyInv: ReadOneQtyInv): Observable<number> {
        return this._http
            .post<number>(this.config.getAPIUrl('1', this.src), qtyInv
            );
    }
}
