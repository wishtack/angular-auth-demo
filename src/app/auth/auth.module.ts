import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Authenticator } from './authenticator';
import { AuthHttp } from './auth-http';
import { TokenStore } from './token-store';
import { Session } from './session';
import { IsUserSignedInGuard } from './is-user-signed-in.guard';
import { IsUserUnknownGuard } from './is-user-unknown.guard';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        Authenticator,
        AuthHttp,
        IsUserSignedInGuard,
        IsUserUnknownGuard,
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
