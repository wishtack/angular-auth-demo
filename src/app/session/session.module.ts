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

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
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
