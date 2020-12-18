import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { ParamsService } from '../../../../services/params.service';
import { ChatService } from '../../../../services/chat.service';

import { User } from '../../../../models/user.model';
import { Chat } from '../../../../models/chat.model';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private chat: Chat;
    private users: User[];
    private loading: boolean = true;

    constructor(private popoverController: PopoverController,
                private authService: AuthService,
                private userService: UserService,
                private paramsService: ParamsService,
                private chatService: ChatService,
                private router: Router
               ) {

    }



    ngOnInit() {
        this.chat = this.paramsService.get();

        let participants = this.chat.participants || [];
        let includedUserIds = participants.map((data) => data.id);

        this.userService.fetchUsers().subscribe((users) => {
            this.users = users.filter((user) => includedUserIds.indexOf(user.id) === -1)
                .map((user) => { user.checked = false; return user; });
            this.loading = false;
        });
    }

    addUser(user: User) {
        user.checked = !user.checked;
    }

    createChat() {
        let participants = this.users.filter((user) => user.checked);

        let chat = new Chat({name: 'Groupchat',
                             type: 'groupchat',
                             description: 'Groupchat',
                             participants: participants});

        this.chatService.createChat(chat)
            .subscribe((data: Chat) => {
                this.chatService.getChat(data)
                    .subscribe((chatData: Chat) => {
                        this.paramsService.set(chatData);
                        this.router.navigate(['/tabs/chat/messages']);
                    });
            });
    }
}
