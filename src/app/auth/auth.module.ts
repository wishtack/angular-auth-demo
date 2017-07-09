import { NgModule } from '@angular/core';

import { SessionModule } from '../session/session.module';
import { SharedModule } from '../shared/shared.module';
import { Authenticator } from './authenticator';
import { AuthHttp } from './auth-http';
import { TokenStore } from './token-store';

@NgModule({
    imports: [
        SessionModule,
        SharedModule
    ],
    providers: [
        Authenticator,
        AuthHttp,
        TokenStore
    ]
})
export class AuthModule {

}
