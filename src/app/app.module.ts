import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';
import { VoiceControlModule } from './voice-control/voice-control.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AuthModule.forRoot(),
        ConfigModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        MdToolbarModule,
        SharedModule,
        VoiceControlModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
