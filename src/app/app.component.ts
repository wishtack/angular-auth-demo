import { Component, OnInit } from '@angular/core';
import { Session } from './session/session';
import { Config } from './config/config';
import { Router } from '@angular/router';
import { SubscriptionGarbageCollector } from './helpers/subscription-garbage-collector';
import { Observable } from 'rxjs/Observable';

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
        private _config: Config,
        private _router: Router,
        private _session: Session
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

    signOut() {
        this._session.signOut();
    }

}
