/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Todo } from './todo';
import { Http } from '@angular/http';
import { Config } from '../config/config';

@Injectable()
export class TodoStore {

    constructor(
        private _config: Config,
        private _http: Http
    ) {
    }

    getTodoList(userId: string): Observable<Todo[]> {

        return this._http.get(`${this._config.getApiBaseUrl()}users/${encodeURIComponent(userId)}/todos`)
            .map((response) => response.json().map((data) => new Todo(data)));

    }

}
