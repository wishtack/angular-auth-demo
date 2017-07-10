/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Session } from './session';

@Injectable()
export class AuthHttp {

    delete: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    get: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    head: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    options: (url: string, options?: RequestOptionsArgs) => Observable<Response>;

    patch: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    post: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    put: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;

    private _headerName = 'Authorization';
    private _tokenKey = 'Bearer';

    constructor(private _http: Http, private _session: Session) {

        /* Methods without body. */
        for (let method of ['delete', 'get', 'head', 'options']) {
            this._decorateMethod({
                method: method,
                hasBody: false
            });
        }

        /* Methods with body. */
        for (let method of ['patch', 'post', 'put']) {
            this._decorateMethod({
                method: method,
                hasBody: true
            });
        }

    }

    private _decorateMethod({method, hasBody}) {

        let optionsPosition = hasBody ? 2 : 1;

        this[method] = (...args) => this._overrideOptions({args, optionsPosition})
            .switchMap((_args) => this._http[method](..._args));


    }

    private _overrideOptions({args, optionsPosition}) {

        return this._session.getToken()
            .map((token) => {

                let _args = [...args];
                let options = _args[optionsPosition];

                if (token != null) {

                    /* Add authorization header to options .*/
                    options = {...options};
                    options.headers = new Headers(options.headers);
                    options.headers.append(
                        this._headerName,
                        `${this._tokenKey} ${encodeURIComponent(token)}`
                    );

                    /* Replace options parameter. */
                    _args[optionsPosition] = options;
                }

                return _args;

            });

    }

}
