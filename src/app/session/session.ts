/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class SessionStateSchema {

    token?: string;
    tokenId?: string;
    userId?: string;

    constructor(args: SessionStateSchema = {}) {
        this.token = args.token;
        this.tokenId = args.tokenId;
        this.userId = args.userId;
    }

}

export class SessionState extends SessionStateSchema {

    isSignedIn() {
        return this.token != null;
    }

}

@Injectable()
export class Session {

    private _localStorageKey = 'wtSessionState';
    private _sessionState$: BehaviorSubject<SessionState>;

    constructor() {

        this._sessionState$ = new BehaviorSubject<SessionState>(null);

        this._initializeState();

    }

    get state$() {
        return this._sessionState$
            .asObservable()
            .filter((state) => state !== null);
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

    isSignedIn() {

        return this.state$
            .first()
            .map((state) => state.isSignedIn());

    }

    onSignin() {

        return this._onStateChange()
            .filter((stateChange) => !stateChange.previous.isSignedIn() && stateChange.current.isSignedIn())
            .map(() => undefined);

    }

    onSignout() {

        return this._onStateChange()
            .filter((stateChange) => stateChange.previous.isSignedIn() && !stateChange.current.isSignedIn())
            .map(() => undefined);

    }

    updateState(stateData: SessionStateSchema) {

        let state = Object.assign(new SessionState(), this._sessionState$.getValue(), stateData);

        this._sessionState$.next(state);
        this._saveState(state);

    }

    private _initializeState() {
        this._sessionState$.next(this._loadState() || new SessionState());
    }

    private _saveState(state: SessionState) {
        localStorage.setItem(this._localStorageKey, JSON.stringify(state));
    }

    private _loadState(): SessionState {

        let stateString = localStorage.getItem(this._localStorageKey);

        if (stateString == null) {
            return null;
        }

        return new SessionState(JSON.parse(stateString));

    }

    private _onStateChange(): Observable<{previous: SessionState, current: SessionState}> {

        return this.state$
            /* Retrieve the last two values. */
            .bufferCount(2, 1)
            .map((stateList) => {

                /* Reverse [previous, new] to [new, previous]. */
                stateList.reverse();

                /* Previous state might not be present if it's the first value. */
                let [currentState, previousState = new SessionState()] = stateList;

                return {
                    current: currentState,
                    previous: previousState
                };

            });

    }

}
