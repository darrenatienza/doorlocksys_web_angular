import { Role } from './../../entities/admin/role';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Config } from '../shared';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    src = 'roles';
    config = new Config();

    getAll(): Observable<Role[]> {
        return this._http
            .get<Role[]>(this.config.getAPIUrl('1', this.src)
            );
    }


    constructor(private _http: HttpClient) { }
}
