/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Session } from './session';
import { Config } from '../config/config';

@Injectable()
export class IsUserSignedInGuard implements CanActivate {

    constructor(
        private _config: Config,
        private _router: Router,
        private _session: Session
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._session.isSignedIn()
            .do((isSignedIn) => {
                if (isSignedIn !== true) {
                    this._router.navigate(this._config.getLoginRoute());
                }
            });

    }

}
