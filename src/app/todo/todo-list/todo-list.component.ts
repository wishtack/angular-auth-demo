/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoStore } from '../todo-store';
import { Todo } from '../todo';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'wt-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

    todoList: Todo[];

    private _subscription: Subscription;

    constructor(private _todoStore: TodoStore) {
    }

    ngOnInit() {
        this._subscription = this._todoStore.getTodoList('foobar')
            .subscribe((todoList) => this.todoList = todoList);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

}
