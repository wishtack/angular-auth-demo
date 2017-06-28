/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Subscription } from 'rxjs/Subscription';


export class SubscriptionGarbageCollector {

    private _subscriptionList: Subscription[];
    private _subscriptionMap: Map<string, Subscription>;

    constructor({component = null} = {}) {
        this._subscriptionList = [];
        this._subscriptionMap = new Map<string, Subscription>();
        this._enableAutoUnsubscribe({component: component});
    }

    addSubscription({key = null, subscription}: {key?: string, subscription: Subscription}) {

        if (key != null) {
            this._removeSubscription({key: key});
            this._subscriptionMap.set(key, subscription);
        }

        else {
            this._subscriptionList.push(subscription);
        }

    }

    unsubscribe() {
        this._subscriptionList.forEach((subscription) => subscription.unsubscribe());
        this._subscriptionMap.forEach((subscription) => subscription.unsubscribe());
    }

    private _enableAutoUnsubscribe({component}) {

        let originalNgOnDestroy;

        if (component == null) {
            return;
        }

        /* Overriding ngOnDestroy to auto unsubscribe from all observables. */
        const decorateNgOnDestroy = (ngOnDestroy) => () => {

            this.unsubscribe();

            /* Calling original ngOnDestroy. */
            if (ngOnDestroy != null) {
                ngOnDestroy();
            }

        };

        if (component.ngOnDestroy != null) {
            originalNgOnDestroy = component.ngOnDestroy.bind(component);
        }

        component.ngOnDestroy = decorateNgOnDestroy(originalNgOnDestroy);

    }

    private _removeSubscription({key}) {

        let subscription = this._subscriptionMap.get(key);

        if (subscription != null) {
            subscription.unsubscribe();
        }

    }

}
