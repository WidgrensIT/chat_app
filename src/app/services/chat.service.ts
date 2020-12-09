import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, delayWhen, retryWhen, switchAll } from 'rxjs/operators';
import { Observable, timer, EMPTY, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Chat } from '../models/chat';
import { Participant } from '../models/participant';
import { Message } from '../models/message';

import { MessageService } from './message.service';

export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private socket$;
    private messages: any;

    constructor(private http: HttpClient,
                private messageService: MessageService) { }

    public connect(user: string, device: string, cfg: { reconnect: boolean } = { reconnect: false }): void {
        if(!this.socket$ || this.socket$.closed) {
            console.log("Connecting");
            this.socket$ = this.getNewWebSocket(user, device);
            this.socket$.subscribe(
                (data) => {
                    this.messageService.push(new Message(data));
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

    createChat(chat: Chat): Observable<Chat> {
        return this.http.post<any>(`${environment.apiUrlClient}/chat`, chat)
            .pipe(
                map((return_obj) => new Chat({id: return_obj['id']}))
            );
    }

    sendMessage(msg: Message): Observable<{id: string }> {
        return this.http.post<any>(`${environment.apiUrlClient}/message`, msg)
            .pipe(
                map((return_obj) => return_obj)
            );
    }

    addParticipant(chatId: string, user: User): Observable<any> {
        return this.http.post<any>(`${environment.apiUrlClient}/chat/${chatId}/participant`, {id: user.id})
            .pipe(
                map((return_obj) => return_obj)
            );
    }

    close() {
        this.socket$.complete();
    }
}
