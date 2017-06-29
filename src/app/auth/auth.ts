/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';

import { Credentials } from './credentials';
import { TokenStore } from './token-store';
import { Session, SessionState } from '../session/session';

@Injectable()
export class Auth {

    constructor(private _session: Session, private _tokenStore: TokenStore) {
    }

    login({credentials}: {credentials: Credentials}) {

        return this._tokenStore.create({credentials: credentials})
            .do((tokenResponse) => {
                this._session.updateState({
                    token: tokenResponse.token,
                    tokenId: tokenResponse.id,
                    userId: tokenResponse.userId
                });
            })
            .map(() => undefined);

    }

    signOut() {

        this._session.state$
            .first()
            .map((state) => state.tokenId)
            .switchMap((tokenId) => {
                this._session.updateState(new SessionState());
                return this._tokenStore.delete({tokenId: tokenId});
            })
            .subscribe();


    }

}
