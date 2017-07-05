/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VoiceControl } from './voice-control';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        VoiceControl
    ]
})
export class VoiceControlModule {
}
