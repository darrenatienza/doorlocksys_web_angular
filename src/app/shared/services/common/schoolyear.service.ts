import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared';
import { SchoolYear } from '../../entities/common';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {

  constructor(private _http: HttpClient) { }

  src = 'schoolyears';
  config = new Config();

  getAll(): Observable<SchoolYear[]> {

    return this._http
      .get<SchoolYear[]>(this.config.getAPIUrl('1', this.src)
      );
  }
}
