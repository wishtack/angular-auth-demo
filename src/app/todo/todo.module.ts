import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoStore } from './todo-store';
import { AuthHttpModule } from '../auth-http/auth-http.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        AuthHttpModule,
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
