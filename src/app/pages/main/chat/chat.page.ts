import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { get } from '../../../services/storage.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        console.log("Yay");
        get('user').then((user) => {
            console.log(user);
            this.chatService.connect(user.id, '2', {reconnect: false});
        });

    }

}
