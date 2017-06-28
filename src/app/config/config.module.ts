/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Config } from './config';

@NgModule({
    imports: [
        SharedModule
    ]
})
export class ConfigModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: ConfigModule,
            providers: [
                Config
            ]
        }

    }

}
