import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { get } from '../../services/storage.service';


@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        get('user').then((user) => this.chatService.connect(user.id, '2'));
    }

}
