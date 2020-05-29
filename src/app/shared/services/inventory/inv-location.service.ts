import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { InvType } from '../..';
import { Config } from '../shared';
import { InvLocation } from '../../entities/inventory/inv-location';

@Injectable({
  providedIn: 'root'
})
export class InvLocationService {

    constructor(private _http: HttpClient) { }

    src = 'invlocations';
      config = new Config();
      getAll(): Observable<InvLocation[]> {
          return this._http
              .get<InvLocation[]>(this.config.getAPIUrl('1', this.src)
              );
      }
}
