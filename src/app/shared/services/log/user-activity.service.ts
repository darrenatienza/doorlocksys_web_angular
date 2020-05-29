import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserActivity } from '../../entities';
import { Guid } from 'guid-typescript';
import { Config } from '../shared';
import { map, debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserActivityService {
    src = 'useractivitylogs';
    config = new Config();

    constructor(private _http: HttpClient) { }


    /* #region  Get User Activity */
    getRecordActivityLogs(recordGuid): Observable<UserActivity> {
        const httpOptions = {
            params: new HttpParams()
                .set('recordGuid', recordGuid)
        };
        return this._http
            .get<UserActivity>(this.config.getAPIUrl('1', this.src), httpOptions
            ).pipe(
                map((event: any) => {
                    return event;
                }, debounceTime(3000)));
    }
    /* #endregion */




    add(userActivity: UserActivity): Observable<Guid> {
        return this._http
            .post<Guid>(this.config.getAPIUrl('1', this.src), userActivity
            );
    }

}
