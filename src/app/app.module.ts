import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';
import { SessionModule } from './session/session.module';
import { VoiceControlModule } from './voice-control/voice-control.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdToolbarModule,
        ConfigModule.forRoot(),
        SessionModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        VoiceControlModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
