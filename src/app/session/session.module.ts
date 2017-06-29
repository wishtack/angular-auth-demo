/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Session } from './session';
import { TokenStore } from './token-store';
import { IsUserSignedInGuard } from './is-user-signed-in.guard';
import { IsUserUnknownGuard } from './is-user-unknown.guard';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        IsUserSignedInGuard,
        IsUserUnknownGuard,
        TokenStore
    ]
})
export class SessionModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SessionModule,
            providers: [
                Session
            ]
        };
    }

}
