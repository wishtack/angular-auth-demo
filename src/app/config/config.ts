/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Config {

    getApiBaseUrl() {
        return this._getRawConfig()['apiBaseUrl'];
    }

    getLoginRoute() {
        return ['login'];
    }

    getPostLoginDefaultRoute() {
        return ['todos'];
    }

    _getRawConfig() {
        return window['__WT_APP_CONFIG__'];
    }

}
