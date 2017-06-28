import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
    {
        path: 'todos',
        component: TodoListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [
        LoginModule,
        RouterModule.forRoot(routes),
        TodoModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
