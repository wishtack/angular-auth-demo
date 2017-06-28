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
import { SubscriptionGarbageCollector } from '../../helpers/subscription-garbage-collector';

@Component({
    selector: 'wt-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    todoList: Todo[];

    private _subscriptionGarbageCollector: SubscriptionGarbageCollector;

    constructor(private _todoStore: TodoStore) {
        this._subscriptionGarbageCollector = new SubscriptionGarbageCollector({component: this});
    }

    ngOnInit() {

        let subscription = this._todoStore.getTodoList('foobar')
            .subscribe(
                (todoList) => this.todoList = todoList,
                () => alert(`D'OH! Something went wrong.`)
            );

        this._subscriptionGarbageCollector.addSubscription({
            key: 'todo-list',
            subscription: subscription
        });

    }

}
