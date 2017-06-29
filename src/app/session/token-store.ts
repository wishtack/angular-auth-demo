/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Credentials } from './credentials';
import { AuthHttp } from '../auth-http/auth-http';
import { Config } from '../config/config';


export class TokenResponse {

    id: string;
    token: string;
    userId: string;

    constructor(args: TokenResponse) {
        this.id = args.id;
        this.token = args.token;
        this.userId = args.userId;
    }

}

@Injectable()
export class TokenStore {

    constructor(
        private _config: Config,
        private _http: Http,
        private _injector: Injector
    ) {
    }

    create({credentials}: {credentials: Credentials}) {

        return this._http.post(this._getResourceBaseUrl(), credentials)
            .map((response) => response.json())
            .map((data) => new TokenResponse(data));

    }

    delete({tokenId}: {tokenId: string}) {

        /* @hack: Injecting `AuthHttp` manually otherwise we fall into a dependency loop. */
        return this._injector.get(AuthHttp)
            .delete(`${this._getResourceBaseUrl()}/${encodeURIComponent(tokenId)}`);

    }

    private _getResourceBaseUrl() {
        return `${this._config.getApiBaseUrl()}tokens`;
    }

}
