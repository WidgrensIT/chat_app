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
        if(this.messages[message.chat_id] !== undefined) {
            this.messages[message.chat_id].push(message);
        } else {
            this.messages[message.chat_id] = [message];
        }
        this.chats$.next(message);
    }

    fetch(chat_id: string): Message[] {
        if(this.messages[chat_id] !== undefined)
            return this.messages[chat_id];
        return [];
    }
}
