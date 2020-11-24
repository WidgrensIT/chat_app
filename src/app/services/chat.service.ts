import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, delayWhen, retryWhen, switchAll } from 'rxjs/operators';
import { Observable, timer, EMPTY, Subject } from 'rxjs';

export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private socket$;
    private messagesSubject$ = new Subject();
    public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
    public deviceId: string;

    constructor() { }

    public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
        if(!this.socket$ || this.socket$.closed) {
            console.log("Connecting");
            this.socket$ = this.getNewWebSocket();
            const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
                                               tap({
                                                   error: error => console.log(error),
                                               }), catchError(_ => EMPTY))
            //toDO only next an observable if a new subscription was made double-check this
            this.messagesSubject$.next(messages);
        } else {
            console.log("Not connecting");
        }
    }

    private getNewWebSocket() {
        let url = WS_ENDPOINT + this.deviceId + '/ws';
        console.log("Connecting to ", url);
        return webSocket({
            url: url,
            openObserver: {
                next: () => {
                    console.log("Connection open");
                }
            },
            closeObserver: {
                next: () => {
                    console.log('connection closed');
                    this.socket$ = undefined;
                    this.connect({reconnect: true});
                }
            },
        });
    }

    private reconnect(observable: Observable<any>): Observable<any> {
        return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('Trying to reconnect', val)),
                                                               delayWhen(_ => timer(RECONNECT_INTERVAL)))));
    }

    sendMessage(msg: any) {
        console.log("Sending");
        this.socket$.next(msg);
    }

    close() {
        this.socket$.complete();
    }
}
