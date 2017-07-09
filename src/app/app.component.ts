import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/delay';

import { Authenticator } from './auth/authenticator';
import { Session } from './auth/session';
import { Config } from './config/config';
import { SubscriptionGarbageCollector } from './helpers/subscription-garbage-collector';
import { VoiceControl } from './voice-control/voice-control';


@Component({
    selector: 'wt-app',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss'
    ]
})
export class AppComponent implements OnInit {

    private _subscriptionGarbageCollector: SubscriptionGarbageCollector;

    isSignedIn$: Observable<boolean>;

    constructor(
        private _authenticator: Authenticator,
        private _config: Config,
        private _http: Http,
        private _router: Router,
        private _session: Session,
        private _voiceControl: VoiceControl
    ) {
        this._subscriptionGarbageCollector = new SubscriptionGarbageCollector({component: this});
    }

    ngOnInit() {

        this.isSignedIn$ = this._session.state$.map((state) => state.isSignedIn());

        let subscription = this._session.onSignout().subscribe(() => {
            this._router.navigate(this._config.getLoginRoute());
        });

        this._subscriptionGarbageCollector.addSubscription({subscription: subscription});

    }

    record() {

        this._voiceControl.record()
            .delay(5000)
            .switchMap((recordHandle) => recordHandle.stopAndGetWav())
            .switchMap((blob) => {
                let formData = new FormData();
                formData.append('record', blob);
                return this._http.post('URL', formData);
            })
            .subscribe(console.log)

    }

    signOut() {
        this._authenticator.signOut();
    }

}
