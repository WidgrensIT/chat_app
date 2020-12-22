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

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

    private currentChat: Chat;
    private message: string;
    private title: string;
    private messages: Message[] = [];

    private sending: boolean = false;

    private attachment: File = null;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private paramsService: ParamsService,
                private chatService: ChatService,
                private messageService: MessageService,
                private popoverController: PopoverController,
                private authService: AuthService
               ) { console.log("constructor") }


    ngOnInit() { console.log("ngOnInit")}
    ionViewWillEnter() {
        console.log("ionViewWillEnter");
        this.messages = [];
        this.currentChat = this.paramsService.get();
        this.title = this.currentChat.name;
        console.log(this.currentChat);
        this.chatService.getArchive(this.currentChat)
            .subscribe((msgs: Message[]) => {
                this.messages = this.messages.concat(msgs);
            });
        this.messageService.messageQueue()
            .subscribe((msg: Message) => {
                if(msg.chat_id == this.currentChat.id) {
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

    attachFile(e) {
        if (e.target.files.length == 0) {
            return
        }
        let file: File = e.target.files[0];
        this.attachment = file;
    }

    async openMenu() {
        this.paramsService.set(this.currentChat);
        const popOver = await this.popoverController.create({component: MenuComponent,
                                                             showBackdrop: true});
        popOver.onDidDismiss().then((obj) => {
            console.log(obj);
            if(obj.data) {
                // New chat created so navigate to that one replacing stack
                this.paramsService.set(obj.data);
                console.log("Changing route");
                this.router.navigate([], {
                    skipLocationChange: true
                });
                //this.router.navigate(['/tabs/chat/messages'], {replaceUrl: true, queryParams: {id: obj.data.id}});
            }
        });

        return await popOver.present();
    }

    sendMessage() {
        this.sending = true;
        let msg = new Message({chat_id: this.currentChat.id,
                               payload: this.message,
                               attachment: this.attachment});
        this.chatService.sendMessage(msg)
            .subscribe((data: {id: string}) => {
                this.message = "";
                this.attachment = null;
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
