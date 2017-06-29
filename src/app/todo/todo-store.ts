/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Todo } from './todo';
import { Config } from '../config/config';
import { AuthHttp } from '../auth-http/auth-http';

@Injectable()
export class TodoStore {

    constructor(
        private _config: Config,
        private _authHttp: AuthHttp
    ) {
    }

    getTodoList({userId}: {userId: string}): Observable<Todo[]> {

        return this._authHttp.get(this._getResourceUrl({userId: userId}))
            .map((response) => response.json().map((data) => new Todo(data)));

    }

    addTodo({userId, todo}: {userId: string, todo: Todo}) {

        return this._authHttp.post(this._getResourceUrl({userId: userId}), todo)
            .map((response) => new Todo(response.json()));

    }

    private _getResourceUrl({userId}) {
        return `${this._config.getApiBaseUrl()}users/${encodeURIComponent(userId)}/todos`;
    }

}
