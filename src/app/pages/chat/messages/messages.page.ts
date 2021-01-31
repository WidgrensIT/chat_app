import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, IonContent } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

import { ParamsService } from '../../../services/params.service';
import { ChatService } from '../../../services/chat.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

import { environment } from '../../../../environments/environment';

import { Message } from '../../../models/message';
import { Chat } from '../../../models/chat';
import { User } from '../../../models/user.model';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

    @ViewChild(IonContent) private chatArea: IonContent;

    private currentChat: Chat;
    private message: string;
    private title: string;
    private messages: Message[] = [];

    private sending: boolean = false;

    private attachments: File[] = [];

    private participants: any[] = [];

    private baseUrl = environment.apiUrl;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private paramsService: ParamsService,
                private chatService: ChatService,
                private messageService: MessageService,
                private popoverController: PopoverController,
                private authService: AuthService
               ) {
    }


    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ionViewWillEnter() {
        this.messages = [];
        this.currentChat = this.paramsService.get();
        this.title = this.currentChat.name;
        let currentUser = this.authService.currentUserValue;
        if (this.currentChat.participants) {
            this.participants = this.currentChat.participants;
        }
        this.participants.push(currentUser);

        this.chatService.getArchive(this.currentChat)
            .subscribe((msgs: Message[]) => {
                msgs = msgs.map((msg) => {
                    msg.from_user = this.participants.find((user) => user.id == msg.sender) || undefined;
                    if(msg.payload && msg.payload.mime) {
                        msg.action = 'attachments';
                    } else {
                        msg.action = 'message';
                    }
                    return msg;
                });
                this.messages = this.messages.concat(msgs);
            });

        this.messageService.messageQueue()
            .subscribe((msg: Message) => {
                if(msg.chat_id == this.currentChat.id) {
                    // This is our chat
                    if(msg.type == "event") {
                        let eventMsg = msg.payload.user.username;
                        if(msg.action == "join") {
                            eventMsg += " have joined the chat";
                        } else if(msg.action == "leave") {
                            eventMsg += " have left the chat";
                        }
                        msg.payload = eventMsg;
                    }
                    this.addMessage(msg);
                }
            });
    }

    ionViewDidEnter() {
        this.chatArea.scrollToBottom(300);
    }

    attachFile(e) {
        if (e.target.files.length == 0) {
            return
        }
        let file: File = e.target.files[0];
        this.attachments.push(file);
        console.log(this.attachments);
    }

    addMessage(msg: Message) {
        msg.from_user = this.participants.find((user) => user.id == msg.sender);
        this.messages.push(msg);
        this.chatArea.scrollToBottom(30);
    }

    async openMenu() {
        console.log("OK");
        this.paramsService.set(this.currentChat);
        const popOver = await this.popoverController.create({component: MenuComponent,
                                                             showBackdrop: true});
        popOver.onDidDismiss().then((obj) => {
            if(obj.data) {
                // New chat created so navigate to that one replacing stack
                this.paramsService.set(obj.data);
                this.router.navigate(['/tabs/chat']).then(() => { this.router.navigate(['/tabs/chat/messages']); });
            }
        });

        return await popOver.present();
    }

    sendMessage() {
        this.sending = true;
        let msg = new Message({chat_id: this.currentChat.id,
                               payload: this.message,
                               attachments: this.attachments});
        if(this.attachments.length > 0) {
            this.chatService.sendAttachments(msg, this.attachments)
                .subscribe((data: {id: string}) => {
                    this.message = "";
                    this.attachments = [];
                    this.sending = false;
                });
        } else {
            this.chatService.sendMessage(msg)
                .subscribe((data: {id: string}) => {
                    this.message = "";
                    this.attachments = [];
                    this.sending = false;
                });
        }
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
