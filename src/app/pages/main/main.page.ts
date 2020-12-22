import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';

import { ChatPage } from '../chat/chat.page';

import { User } from '../../models/user.model';
import { Chat } from '../../models/chat';
import { Participant } from '../../models/participant';

import { ParamsService } from '../../services/params.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    contacts: User[];

    constructor(private userService: UserService,
                private router: Router,
                private ngZone: NgZone,
                private navCtrl: NavController,
                private paramsService: ParamsService,
                private chatService: ChatService
               ) { }

    ngOnInit() {
        this.userService.fetchUsers().subscribe((data) => this.contacts = data);
    }

    openChat(user: User) {
        let participants: Participant[] = [new Participant({id: user.id})];
        let newChat = new Chat({'name': user.username, 'description': '-', 'type': '1to1', 'participants': participants});
        this.chatService.createChat(newChat)
            .subscribe((data: Chat) => {
                this.chatService.getChat(data)
                    .subscribe((chatData: Chat) => {
                        console.log(chatData);
                        this.paramsService.set(chatData);
                        this.router.navigate(['/tabs/chat/messages'], {replaceUrl: true, queryParams: {id: chatData.id}});
                    });
            });
    }

}
