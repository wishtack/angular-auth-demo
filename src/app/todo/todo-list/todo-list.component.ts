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
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'wt-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

    todoFormGroup: FormGroup;
    todoList: Todo[];

    private _subscription: Subscription;

    constructor(private _todoStore: TodoStore) {
        this.todoFormGroup = new FormGroup({
            description: new FormControl()
        });
    }

    ngOnInit() {
        this._subscription = this._todoStore.getTodoList({userId: 'foobar'})
            .subscribe((todoList) => this.todoList = todoList);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    addTodo() {

        let todo = new Todo(this.todoFormGroup.value);

        this._todoStore.addTodo({userId: 'foobar', todo: todo})
            .subscribe(
                (_todo) => {
                    this.todoList = [...this.todoList, _todo];
                    this.todoFormGroup.reset();
                },
                () => alert(`D'OH! Something went wrong.`)
            );
    }

}
