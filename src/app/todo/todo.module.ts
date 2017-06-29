import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoStore } from './todo-store';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ...TodoModule.COMPONENT_LIST
    ],
    exports: [
        ...TodoModule.COMPONENT_LIST
    ],
    providers: [
        TodoStore
    ]
})
export class TodoModule {

    static COMPONENT_LIST = [
        TodoListComponent
    ]

}
