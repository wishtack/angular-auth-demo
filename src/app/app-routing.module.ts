import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';
import { SessionModule } from './session/session.module';
import { IsUserSignedInGuard } from './session/is-user-signed-in.guard';
import { IsUserUnknownGuard } from './session/is-user-unknown.guard';

const routes: Routes = [
    {
        path: 'todos',
        canActivate: [IsUserSignedInGuard],
        component: TodoListComponent
    },
    {
        path: 'login',
        canActivate: [IsUserUnknownGuard],
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
        SessionModule,
        TodoModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
