import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        console.log("Yay");
        this.chatService.deviceId = '1';
        this.chatService.connect({reconnect: false});

    }

}
