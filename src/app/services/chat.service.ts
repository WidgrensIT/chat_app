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
    private messages: any;

    constructor() { }

    public connect(user: string, device: string, cfg: { reconnect: boolean } = { reconnect: false }): void {
        if(!this.socket$ || this.socket$.closed) {
            console.log("Connecting");
            this.socket$ = this.getNewWebSocket(user, device);
            this.socket$.subscribe(
                (data) => {
                    console.log(data);
                });
        } else {
            console.log("Not connecting");
        }
    }

    private getNewWebSocket(user: string, device: string) {
        let url = WS_ENDPOINT + '/device/' + device + '/user/' + user + '/ws';
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
                }
            },
        });
    }

    sendMessage(msg: any) {
        console.log("Sending");
        this.socket$.next(msg);
    }

    close() {
        this.socket$.complete();
    }
}
