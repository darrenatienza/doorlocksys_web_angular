import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadOneQtyInv } from '../..';
import { Config } from '../shared';
import { InvType } from '../../entities';

@Injectable({
    providedIn: 'root'
})
export class InvTypeService {


    constructor(private _http: HttpClient) { }

    src = 'invtypes';
    config = new Config();

    get(invTypeID: number): Observable<InvType>  {
        const params = new HttpParams()
            .set('invTypeID', invTypeID.toString());
        return this._http
        .get<InvType>(this.config.getAPIUrl('1', this.src), { params }
        );
    }
    getAll(): Observable<InvType[]> {
        return this._http
            .get<InvType[]>(this.config.getAPIUrl('1', this.src)
            );
    }
}
