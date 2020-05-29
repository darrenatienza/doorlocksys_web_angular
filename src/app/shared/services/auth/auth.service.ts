import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../shared/config';
import { retry, map, debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    src = 'token';
    url = environment.url;

    onLogin(login): Observable<string> {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };

        const body = {src: 'token', name: 'generatetoken', param: { username: login.username, password: login.password  }};
        return this._http
            .post<any>(this.url, body, httpOptions)
            .pipe(map(data => {
                if (data.response) {
                    return data.response.result.token;
                }
            }));
    }
    onLogOut() {
        localStorage.removeItem('token');
    }

    constructor(private _http: HttpClient) { }
}
