import { SgReport } from './../../entities/sg/sg-report';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared/config';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    src = 'sg';
    config = new Config();

    getLastReport() {
        const params = new HttpParams()
            .set('isGetLastReport', 'true');
        return this._http.get<any>(this.config.getAPIUrl('1', this.src), { params });
    }

    update(id: number, value: any): Observable<any> {
        const params = new HttpParams()
            .set('reportID', id.toString());
        return this._http.put<any>(this.config.getAPIUrl('1', this.src),
            value,{params});
    }
    delete(value: number): Observable<any> {

        const params = new HttpParams()
            .set('reportID', value.toString());
        return this._http.delete<any>(this.config.getAPIUrl('1', this.src),
            { params });
    }
    getDetails(reportID: any): Observable<any> {
        const params = new HttpParams()
            .set('reportID', reportID);
        return this._http.get<any>(this.config.getAPIUrl('1', this.src), { params });
    }
    getAll(from, to): Observable<SgReport[]> {
        const params = new HttpParams()
            .set('dateFrom', from)
            .set('dateTo', to);
        return this._http.get<SgReport[]>(this.config.getAPIUrl('1', this.src), { params });
    }
    addNew(report: SgReport): Observable<number> {
        const body = JSON.stringify(report);
        return this._http.post<number>(this.config.getAPIUrl('1', this.src),
            report);
    }

    constructor(private _http: HttpClient) { }
}
