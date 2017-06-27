import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
    {
        path: 'todos',
        component: TodoListComponent
    },
    {
        path: '**',
        redirectTo: 'todos'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        TodoModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
