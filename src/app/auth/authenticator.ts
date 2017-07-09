/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';

import { Credentials } from './credentials';
import { TokenStore } from './token-store';
import { Session } from '../session/session';

@Injectable()
export class Authenticator {

    constructor(private _session: Session, private _tokenStore: TokenStore) {
    }

    logIn({credentials}: {credentials: Credentials}) {

        return this._tokenStore.create({credentials: credentials})
            .do((tokenResponse) => {
                this._session.updateState({
                    token: tokenResponse.token,
                    userId: tokenResponse.userId
                });
            })
            .map(() => undefined);

    }

}
