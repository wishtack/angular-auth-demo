import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthHttp } from './auth-http';
import { SessionModule } from '../session/session.module';

@NgModule({
    imports: [
        SessionModule,
        SharedModule
    ],
    providers: [
        AuthHttp
    ]
})
export class AuthHttpModule {

}
