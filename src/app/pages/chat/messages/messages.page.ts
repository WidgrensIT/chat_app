import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamsService } from '../../../services/params.service';
import { ChatService } from '../../../services/chat.service';
import { MessageService } from '../../../services/message.service';

import { Message } from '../../../models/message';
import { Chat } from '../../../models/chat';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

    private currentChat: Chat;
    private currentUser: User;
    private message: string;

    private messages: Message[] = [];

    private sending: boolean = false;

    constructor(private route: ActivatedRoute,
                private paramsService: ParamsService,
                private chatService: ChatService,
                private messageService: MessageService
               ) { }

    ngOnInit() {
        let obj = this.paramsService.get();
        this.currentChat = obj.chat;
        this.currentUser = obj.user;
        this.messageService.messageQueue()
            .subscribe((msg: Message) => {
                if(msg.chatId == this.currentChat.id) {
                    // This is our chat
                    this.messages.push(msg);
                }
            });
    }

    sendMessage() {
        this.sending = true;
        let msg = new Message({chatId: this.currentChat.id,
                               payload: this.message});
        this.chatService.sendMessage(msg)
            .subscribe((data: {id: string}) => {
                this.message = "";
                this.sending = false;
            });
    }

    getClasses(sender: string) {
        if(sender == this.currentUser.id) {
            return 'outgoing';
        } else {
            return 'incoming';
        }
    }
}
