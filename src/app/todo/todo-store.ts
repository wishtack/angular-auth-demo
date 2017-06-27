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

@Injectable()
export class TodoStore {

    constructor(private _http: Http) {
    }

    getTodoList(userId: string): Observable<Todo[]> {

        return this._http.get(`http://localhost:8000/api/v1/users/${userId}/todos`)
            .map((response) => response.json().map((data) => new Todo(data)));

    }

}
