/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Credentials } from './credentials';
import { Config } from '../config/config';


export class TokenResponse {

    token: string;
    userId: string;

    constructor(args: TokenResponse) {
        this.token = args.token;
        this.userId = args.userId;
    }

}

@Injectable()
export class TokenStore {

    constructor(
        private _config: Config,
        private _http: Http
    ) {
    }

    create({credentials}: {credentials: Credentials}) {

        return this._http.post(this._getResourceBaseUrl(), credentials)
            .map((response) => response.json())
            .map((data) => new TokenResponse(data));

    }

    private _getResourceBaseUrl() {
        return `${this._config.getApiBaseUrl()}tokens`;
    }

}
