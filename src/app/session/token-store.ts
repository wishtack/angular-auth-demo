/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Credentials } from './credentials';


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

    constructor(private _http: Http) {
    }

    create({credentials}: {credentials: Credentials}) {

        return this._http.post('http://localhost:8000/api/v1/tokens', credentials)
            .map((response) => response.json())
            .map((data) => new TokenResponse(data));

    }

}
