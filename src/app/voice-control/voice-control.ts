/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const Recorder = require('./recorder');

export class RecordHandle {

    private _recorder: any;

    constructor({recorder}) {
        this._recorder = recorder;
    }

    stopAndGetWav(): Observable<Blob> {

        return new Observable((observer) => {

            this._recorder.stop();
            this._recorder.exportWAV((blob) => observer.next(blob));

        });

    }

}

@Injectable()
export class VoiceControl {

    /**
     * Usage:
     *
     * Start:
     *
     *     new VoiceControl().record().subscribe((_recordHandle) => recordHandle = _recordHandle);
     *
     * Stop:
     *
     *     recordHandle.stopAndGetWav()
     *         .switchMap((blob) => {
     *             let formData = new FormData();
     *             formData.append('record', blob);
     *             return this._http.post('URL', formData);
     *         })
     *         .subscribe(...)
     *
     * Or with a timer:
     *
     *     this._voiceControl.record()
     *         .delay(2000)
     *         .switchMap((recordHandle) => recordHandle.stopAndGetWav())
     *         .switchMap((blob) => {
     *             let formData = new FormData();
     *             formData.append('record', blob);
     *             return this._http.post('URL', formData);
     *         })
     *         .subscribe(console.log);
     *
     */
    record(): Observable<RecordHandle> {

        return new Observable((observer) => {

            let isCanceled;

            navigator.getUserMedia(
                {audio: true},
                (stream) => {

                    if (isCanceled === true) {
                        return;
                    }

                    let input = new AudioContext().createMediaStreamSource(stream);
                    let recorder = new Recorder(input);

                    recorder.record();

                    observer.next(new RecordHandle({recorder: recorder}));
                    observer.complete();
                },
                (error) => observer.error(error)
            );

            return () => isCanceled = true;

        });

    }
}
