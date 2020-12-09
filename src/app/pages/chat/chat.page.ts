import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { get } from '../../services/storage.service';
import { ChatMngmtService } from '../../services/chat-mngmt.service';
import { ParamsService } from '../../services/params.service';
import { Router } from '@angular/router';

import { Chat } from '../../models/chat.model';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    private chats: Chat[] = [];
    private loading: boolean = true;

    constructor(private chatService: ChatService,
                private chatManagementService: ChatMngmtService,
                private paramsService: ParamsService,
                private router: Router
               ) {}

    ngOnInit() {
        this.chatManagementService.getChats().subscribe((data) => {
            this.loading = false;
            this.chats = data
        });
    }

    openChat(chat: Chat) {
        this.paramsService.set(chat);
        this.router.navigate(['/tabs/chat/messages']);
    }

}
