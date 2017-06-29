/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { TokenStore } from './token-store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class SessionState {

    token?: string;
    userId?: string;

    constructor(args: SessionState = {}) {
        this.token = args.token;
        this.userId = args.userId;
    }

}

@Injectable()
export class Session {

    private _sessionState$: BehaviorSubject<SessionState>;

    constructor(private _tokenStore: TokenStore) {
        this._sessionState$ = new BehaviorSubject<SessionState>(null);
        this._initializeState();
    }

    get state$() {
        return this._sessionState$
            .asObservable()
            .filter((state) => state !== null);
    }

    login({credentials}: {credentials: Credentials}) {

        return this._tokenStore.create({credentials: credentials})
            .do((tokenResponse) => {
                this._updateState({
                    token: tokenResponse.token,
                    userId: tokenResponse.userId
                })
            })
            .map(() => undefined);

    }

    getToken(): Observable<string> {

        return this.state$
            .first()
            .map((state) => state.token);

    }

    getUserId() {

        return this.state$
            .first()
            .map((state) => state.userId);

    }

    private _updateState(state: SessionState) {

        state = Object.assign(new SessionState(), this._sessionState$.getValue(), state);

        this._sessionState$.next(state);
        this._saveState(state);

    }

    private _initializeState() {
        this._sessionState$.next(this._loadState() || new SessionState());
    }

    private _saveState(state: SessionState) {
        localStorage.setItem('wtSessionState', JSON.stringify(state));
    }

    private _loadState(): SessionState {

        let stateString = localStorage.getItem('wtSessionState');

        if (stateString == null) {
            return null;
        }

        return new SessionState(JSON.parse(stateString));

    }
}
