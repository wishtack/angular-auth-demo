import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Credentials } from '../../session/credentials';
import { Session } from '../../session/session';
import { Config } from '../../config/config';
import { SubscriptionGarbageCollector } from '../../helpers/subscription-garbage-collector';

@Component({
    selector: 'wt-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;

    private _subscriptionGarbabeCollector;

    constructor(
        private _config: Config,
        private _router: Router,
        private _session: Session
    ) {

        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });

        this._subscriptionGarbabeCollector = new SubscriptionGarbageCollector({component: this});

    }

    logIn() {

        let subscription = this._session.login({credentials: new Credentials(this.loginForm.value)})
            .subscribe(
                () => this._router.navigate(this._config.getPostLoginDefaultRoute()),
                () => alert(`D'OH! Something went wrong.`)
            );

        this._subscriptionGarbabeCollector.addSubscription({
            key: 'login',
            subscription: subscription
        });

    }

}
