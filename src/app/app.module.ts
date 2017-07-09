import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

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
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
