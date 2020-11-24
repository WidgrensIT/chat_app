import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

import { ChatPage } from './chat/chat.page';

import { User } from '../../models/user.model';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    contacts: User[];

    constructor(private userService: UserService,
                private router: Router,
                private navCtrl: NavController
               ) { }

    ngOnInit() {
        this.userService.fetchUsers().subscribe((data) => this.contacts = data);
    }

    openChat(user: User) {
        this.router.navigate(['/chat', { user: user}]);
    }

}
