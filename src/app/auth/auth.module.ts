import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Authenticator } from './authenticator';
import { AuthHttp } from './auth-http';
import { TokenStore } from './token-store';
import { Session } from './session';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        Authenticator,
        AuthHttp,
        TokenStore
    ]
})
export class AuthModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: AuthModule,
            providers: [
                Session
            ]
        };

    }

}
