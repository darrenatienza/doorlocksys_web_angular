import { Injectable } from '@angular/core';
import { Config } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../../entities/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }

  src = 'locations';
  config = new Config();

  getAll(studentReqTypeID: number): Observable<Location[]> {
    const params = new HttpParams()
      .set('studentReqID', studentReqTypeID.toString());
    return this._http
      .get<Location[]>(this.config.getAPIUrl('1', this.src), {params}
      );
  }
}
