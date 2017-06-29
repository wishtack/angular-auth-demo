/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Session } from '../session/session';

@Injectable()
export class AuthHttp {

    constructor(private _http: Http, private _session: Session) {
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._overrideOptions(options)
            .switchMap((_options) => this._http.get(url, _options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._overrideOptions(options)
            .switchMap((_options) => this._http.delete(url, _options));
    }

    private _overrideOptions(options): Observable<RequestOptionsArgs> {

        return this._session.getToken()
            .map((token) => {
                if (token != null) {
                    options = Object.assign({}, options);
                    options.headers = Object.assign({}, options.headers, {
                        'Authorization': `Bearer ${token}`
                    });
                }
                return options;
            });

    }

}
