/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SubscriptionGarbageCollector } from '../../helpers/subscription-garbage-collector';
import { Session } from '../../auth/session';
import { Todo } from '../todo';
import { TodoStore } from '../todo-store';

@Component({
    selector: 'wt-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    todoFormGroup: FormGroup;
    todoList: Todo[];

    private _subscriptionGarbageCollector: SubscriptionGarbageCollector;

    constructor(
        private _session: Session,
        private _todoStore: TodoStore
    ) {

        this._subscriptionGarbageCollector = new SubscriptionGarbageCollector({component: this});

        this.todoFormGroup = new FormGroup({
            description: new FormControl()
        });

    }

    ngOnInit() {

        let subscription = this._session.getUserId()
            .switchMap((userId) => this._todoStore.getTodoList({userId: userId}))
            .subscribe(
                (todoList) => this.todoList = todoList,
                () => alert(`D'OH! Something went wrong.`)
            );

        this._subscriptionGarbageCollector.addSubscription({
            key: 'todo-list',
            subscription: subscription
        });

    }

    addTodo() {

        let todo = new Todo(this.todoFormGroup.value);

        let subscription = this._session.getUserId()
            .switchMap((userId) => this._todoStore.addTodo({userId: userId, todo: todo}))
            .subscribe(
                (_todo) => {
                    this.todoList = [...this.todoList, _todo];
                    this.todoFormGroup.reset();
                },
                () => alert(`D'OH! Something went wrong.`)
            );

        this._subscriptionGarbageCollector.addSubscription({subscription: subscription});

    }

}
