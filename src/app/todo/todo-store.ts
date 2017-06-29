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

    getTodoList({userId}: {userId: string}): Observable<Todo[]> {

        return this._http.get(this._getResourceUrl({userId: userId}))
            .map((response) => response.json().map((data) => new Todo(data)));

    }

    addTodo({userId, todo}: {userId: string, todo: Todo}) {

        return this._http.post(this._getResourceUrl({userId: userId}), todo)
            .map((response) => new Todo(response.json()));

    }

    private _getResourceUrl({userId}) {
        return `${this._config.getApiBaseUrl()}users/${encodeURIComponent(userId)}/todos`;
    }

}
