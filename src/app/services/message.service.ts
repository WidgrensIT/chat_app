import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private messages = {};

    private chats$ = new Subject<Message>();

    constructor() { }

    messageQueue() {
        return this.chats$;
    }

    push(message: Message) {
        if(this.messages[message.chatId] !== undefined) {
            this.messages[message.chatId].push(message);
        } else {
            this.messages[message.chatId] = [message];
        }
        this.chats$.next(message);
    }

    fetch(chatId: string): Message[] {
        if(this.messages[chatId] !== undefined)
            return this.messages[chatId];
        return [];
    }
}
