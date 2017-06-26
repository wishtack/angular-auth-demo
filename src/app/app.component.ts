import { Component } from '@angular/core';

@Component({
    selector: 'wt-app',
    templateUrl: './app.component.html',
    styleUrls: [
        '../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
        './app.component.scss'
    ]
})
export class AppComponent {
    title = 'wt works!';
}
