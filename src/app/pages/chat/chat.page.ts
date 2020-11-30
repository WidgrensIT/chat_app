import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { get } from '../../services/storage.service';
import { ChatMngmtService } from '../../services/chat-mngmt.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    private chats = [];

    constructor(private chatService: ChatService,
                private chatManagementService: ChatMngmtService) {}

    ngOnInit() {
        this.chatManagementService.getChats().subscribe((data) => this.chats = data);

        get('user').then((user) => {
            this.chatService.connect(user.id, '2', {reconnect: false});
        });

    }

}
