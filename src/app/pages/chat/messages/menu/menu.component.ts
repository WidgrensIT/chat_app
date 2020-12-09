import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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
                private chatService: ChatService
               ) {

    }



    ngOnInit() {
        this.chat = this.paramsService.get();

        let participants = this.chat.participants || [];
        let includedUserIds = participants.map((data) => data.id);

        this.userService.fetchUsers().subscribe((users) => {
            this.users = users.filter((user) => includedUserIds.indexOf(user.id) === -1);
            this.loading = false;
        });
    }

    addUser(user: User) {
        this.chatService.addParticipant(this.chat.id, user).subscribe((data) => {
            this.popoverController.dismiss({'user': user});
        });
    }
}
