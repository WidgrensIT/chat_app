import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

import { ParamsService } from '../../../services/params.service';
import { ChatService } from '../../../services/chat.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

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
    private message: string;

    private messages: Message[] = [];

    private sending: boolean = false;

    constructor(private route: ActivatedRoute,
                private paramsService: ParamsService,
                private chatService: ChatService,
                private messageService: MessageService,
                private popoverController: PopoverController,
                private authService: AuthService
               ) { }

    ngOnInit() {
        console.log("ngOnInit");
        this.messages = [];
        this.currentChat = this.paramsService.get();
        this.chatService.getArchive(this.currentChat)
            .subscribe((msgs: Message[]) => {
                this.messages = this.messages.concat(msgs);
            });

        this.messageService.messageQueue()
            .subscribe((msg: Message) => {
                if(msg.chatId == this.currentChat.id) {
                    // This is our chat
                    console.log(msg);
                    if(msg.type == "event") {
                        let eventMsg = msg.payload.user.username;
                        if(msg.action == "join") {
                            eventMsg += " have joined the chat";
                        } else if(msg.action == "leave") {
                            eventMsg += " have left the chat";
                        }
                        msg.payload = eventMsg;
                    }
                    this.messages.push(msg);
                }
            });
    }

    async openMenu() {
        this.paramsService.set(this.currentChat);
        const popOver = await this.popoverController.create({component: MenuComponent,
                                                             showBackdrop: true});
        popOver.onDidDismiss().then((obj) => {
            if(obj.data && obj.data.user) {
                // Added a new user
                if(!this.currentChat.participants)
                    this.currentChat.participants = [];
                this.currentChat.participants.push(obj.data.user);
            }
        });

        return await popOver.present();
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

    getClasses(message: Message) {
        if(message && message.type == "event") {
            // Check what kind of event
            return 'event';
        } else if(this.authService.currentUserValue.id == message.sender) {
            return 'outgoing';
        } else {
            return 'incoming';
        }
    }
}
