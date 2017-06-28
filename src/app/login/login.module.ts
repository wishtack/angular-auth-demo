import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { TokenStore } from '../session/token-store';

@NgModule({
    imports: [
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}
