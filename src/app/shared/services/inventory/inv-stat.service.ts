import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared';
import { ReadAllInvStat } from '../../entities';


@Injectable({
  providedIn: 'root'
})
export class InvStatService {

    constructor(private _http: HttpClient) { }

    src = 'invstats';
    config = new Config();


    getAll(): Observable<ReadAllInvStat[]> {
        return this._http
            .get<ReadAllInvStat[]>(this.config.getAPIUrl('1', this.src)
            );
    }
}
