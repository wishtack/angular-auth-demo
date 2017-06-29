import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdInputModule } from '@angular/material';

@NgModule({
    imports: SharedModule.MODULE_LIST,
    exports: SharedModule.MODULE_LIST
})
export class SharedModule {

    static MODULE_LIST = [
        CommonModule,
        FlexLayoutModule,
        HttpModule,
        MdButtonModule,
        MdInputModule,
        ReactiveFormsModule
    ]

}
